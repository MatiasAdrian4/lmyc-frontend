import { GetServerSideProps } from "next"
import { useRef, useState } from "react"
import {
  getClients,
  getProducts,
  newInvoice,
  newSalesUpdatingStock
} from "api/fetch"
import { SearchModal } from "components/SearchModal"
import {
  SEARCH_CLIENT_COLUMNS,
  SEARCH_PRODUCTS_COLUMNS
} from "components/table/columns"
import {
  BasicSale,
  Client,
  ExtendedProduct,
  CreateInvoiceItem
} from "lmyc_client"
import {
  actionPopup,
  downloadInvoicePDF,
  errorPopup,
  isUserAuthenticated,
  ssRedirectToLoginPage,
  successPopup,
  toFixed2
} from "utils/utils"
import styles from "styles/sales/Sales.module.css"
import { Models } from "utils/constants"

type CartProduct = ExtendedProduct & {
  cantidad?: number
  total?: number
  borrar?: boolean
}

enum SaleType {
  Cash = 1,
  CheckingAccount = 2
}

export default function SalesList() {
  const productModalRef = useRef(null)
  const clientModalRef = useRef(null)

  const [products, setProducts] = useState([].concat({ total: 0.0 }))
  const [saleTypeSelected, setSaleTypeSelected] = useState(SaleType.Cash)
  const [clientSelected, setClientSelected] = useState(null)

  const openModal = (modalRef) => {
    modalRef.current.openModal()
  }

  const addProduct = (product: CartProduct) => {
    if (!products.map((product) => product.codigo).includes(product.codigo)) {
      /* Insert product as penultimate element of the list (total is always the last one) */
      product.cantidad = 0
      product.total = 0
      product.borrar = true
      const totalProduct = products.pop()
      setProducts(products.concat(product).concat(totalProduct))
    }
  }

  const selectProduct = (product: ExtendedProduct) => {
    addProduct(product)
    productModalRef.current.closeModal()
  }

  const currentTotal = (products) => {
    return toFixed2(
      products
        .slice(0, products.length - 1)
        .reduce((partialSum, product) => partialSum + product.total, 0)
    )
  }

  const onChangeQuantity = (productId, quantity) => {
    /* Search product in products array and update his total depending on the selected quantity */
    const productIndex = products
      .map((product) => product.codigo)
      .indexOf(productId)
    products[productIndex].cantidad = quantity
    products[productIndex].total = toFixed2(
      products[productIndex].precio_venta_contado * quantity
    )

    /* Update total */
    products[products.length - 1].total = currentTotal(products)
    setProducts([...products])
  }

  const selectClient = (client: Client) => {
    setClientSelected(client)
    clientModalRef.current.closeModal()
  }

  const onChangeSaleType = (event) => {
    setSaleTypeSelected(+event.target.value)
    setClientSelected(null)
  }

  const deleteProduct = (productId) => {
    const filterProducts = products.filter(
      (product) => product.codigo !== productId
    )
    filterProducts[filterProducts.length - 1].total =
      currentTotal(filterProducts)
    setProducts([...filterProducts])
  }

  const cartIsEmpty = (): boolean => {
    const totalProduct: CartProduct = products.filter(
      (product) => !product.codigo
    )[0]
    return !(totalProduct.total > 0)
  }

  const getProductsReadyForSale = () => {
    return products.filter((product) => product.codigo && product.total !== 0)
  }

  const makeSale = async () => {
    const producstForSale: BasicSale[] = getProductsReadyForSale().map(
      (product) =>
        ({
          producto: product.codigo,
          cantidad: product.cantidad,
          precio: product.total
        } as BasicSale)
    )
    try {
      await newSalesUpdatingStock({ ventas: producstForSale })
      successPopup("Venta registrada correctamente.")
      setProducts([{ total: 0.0 }])
    } catch (e) {
      errorPopup("Ha ocurrido un error al intentar registrar la venta.")
    }
  }

  const makeInvoice = async () => {
    const producstForSale: CreateInvoiceItem[] = getProductsReadyForSale().map(
      (product) =>
        ({
          producto: product.codigo,
          cantidad: product.cantidad
        } as CreateInvoiceItem)
    )
    try {
      const response = await newInvoice({
        cliente: clientSelected.id,
        elementos_remito: producstForSale
      })
      actionPopup("El recibo fue generado correctamente.", "Descargar", () =>
        downloadInvoicePDF(response.data["codigo"])
      )
      setProducts([{ total: 0.0 }])
    } catch (e) {
      errorPopup("Ha ocurrido un error al intentar generar el remito.")
    }
  }

  return (
    <>
      <div id="sales">
        <div className={styles.addProductSection}>
          <button onClick={() => openModal(productModalRef)}>
            Agregar Producto
          </button>
        </div>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Detalle</th>
              <th>Precio Contado</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.codigo ? product.codigo : "total"}>
                <td>{product.codigo}</td>
                <td>{product.detalle}</td>
                <td>
                  {product.codigo && (
                    <input
                      type="number"
                      defaultValue={product.precio_venta_contado}
                    />
                  )}
                </td>
                <td>
                  {product.codigo && (
                    <input
                      type="number"
                      onChange={(e) =>
                        onChangeQuantity(product.codigo, +e.target.value)
                      }
                    />
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    readOnly={true}
                    value={parseFloat(product.total)}
                  />
                </td>
                <td>
                  {product.borrar && (
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteProduct(product.codigo)}
                    >
                      X
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <SearchModal
          ref={productModalRef}
          modelName={Models.Product}
          columns={SEARCH_PRODUCTS_COLUMNS(selectProduct)}
          fetchData={getProducts}
          searchInputPlaceholder={"Buscar por Cód., Det. o Cat."}
        />
        <SearchModal
          ref={clientModalRef}
          modelName={Models.Client}
          columns={SEARCH_CLIENT_COLUMNS(selectClient)}
          fetchData={getClients}
          searchInputPlaceholder={"Buscar por Cód. o Nombre."}
        />
        <div className={styles.salesActions} onChange={onChangeSaleType}>
          <input
            type="radio"
            value={SaleType.Cash}
            name="saleType"
            defaultChecked
          />{" "}
          Efectivo
          <br></br>
          <input
            type="radio"
            value={SaleType.CheckingAccount}
            name="saleType"
          />{" "}
          Cta. Cte.
          <button
            className={styles.searchClientButton}
            disabled={saleTypeSelected == SaleType.Cash}
            onClick={() => openModal(clientModalRef)}
          >
            Buscar Cliente
          </button>
          <input
            readOnly={true}
            disabled={saleTypeSelected == SaleType.Cash}
            type="text"
            value={clientSelected ? clientSelected.nombre : ""}
          />
          <br></br>
          <br></br>
          {saleTypeSelected == SaleType.Cash && (
            <button
              className={styles.submitButton}
              disabled={cartIsEmpty()}
              onClick={makeSale}
            >
              Venta
            </button>
          )}
          {saleTypeSelected == SaleType.CheckingAccount && (
            <button
              className={styles.submitButton}
              disabled={cartIsEmpty() || !clientSelected}
              onClick={makeInvoice}
            >
              Generar Remito
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  return {
    props: {}
  }
}
