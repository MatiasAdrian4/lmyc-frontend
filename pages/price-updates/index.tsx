import { GetServerSideProps } from "next"
import {
  errorPopup,
  isUserAuthenticated,
  ssRedirectToLoginPage,
  successPopup
} from "utils/utils"
import styles from "styles/price-updates/PriceUpdates.module.css"
import { BasicTable } from "components/table/BasicTable"
import { UPDATE_PRODUCT_PRICES_COLUMNS } from "components/table/columns"
import { useState } from "react"
import { getProducts, productsPriceUpdates } from "api/fetch"
import { ExtendedProduct } from "lmyc_client"

type ProductForUpdate = ExtendedProduct & {
  selected?: boolean
}

export default function PriceUpdates({}) {
  const [products, setProducts] = useState<ProductForUpdate[]>([])
  const [searchText, setSearchText] = useState("")
  const [increasePercentage, setIncreasePercentage] = useState(0)

  const resetFields = () => {
    setProducts([])
    setSearchText("")
    setIncreasePercentage(0)
  }

  const searchProducts = async () => {
    const productsForUpdate: ProductForUpdate[] =
      (await getProducts(1, 100000, searchText)).results ?? []
    productsForUpdate.forEach((product) => (product.selected = true))
    setProducts(productsForUpdate)
  }

  const setSelected = (productCode: number, selected: boolean) => {
    products.filter((product) => product.codigo === productCode)[0].selected =
      selected
    setProducts([...products])
  }

  const savePriceUpdates = async () => {
    try {
      await productsPriceUpdates({
        porcentaje_aumento: increasePercentage,
        productos: products
          .filter((product) => product.selected)
          .map((product) => product.codigo!)
      })
      successPopup(`Precios actualizados correctamente.`)
      resetFields()
    } catch (error) {
      errorPopup(
        "Ha ocurrido un error al intentar actualizar el precio de los productos seleccionados."
      )
    }
  }

  return (
    <>
      <div className={`${styles.section} ${styles.searchBar}`}>
        <input
          type="text"
          placeholder="Buscar por Cód., Det. o Cat."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={searchProducts}>Buscar</button>
      </div>
      <div className={`${styles.section} ${styles.productsList}`}>
        <BasicTable
          title={"Producto"}
          columns={UPDATE_PRODUCT_PRICES_COLUMNS(setSelected)}
          data={products}
        />
      </div>
      <div className={`${styles.section} ${styles.updateActions}`}>
        <span>Aumento (en %)</span>
        <input
          type="number"
          min="0"
          value={increasePercentage}
          onChange={(e) => setIncreasePercentage(+e.target.value)}
        />
        <button onClick={savePriceUpdates} disabled={increasePercentage <= 0}>
          Actualizar precios
        </button>
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
