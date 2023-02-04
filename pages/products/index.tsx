import { GetServerSideProps } from "next"
import { ProductsApi } from "../../api/lmycApi"
import { CustomForm } from "../../components/form/CustomForm"
import { PaginatedTable } from "../../components/table/PaginatedTable"
import { PRODUCT_COLUMNS } from "../../components/table/columns"
import {
  Models,
  PRODUCTS_SEARCH_LOCAL_STORAGE,
  PRODUCT_CATEGORIES,
  ROWS_PER_PAGE
} from "../../utils/constants"
import { PRODUCT_SECTIONS } from "../../components/form/forms"
import {
  fetchAvailableCodes,
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import styles from "../../styles/products/Products.module.css"
import { getProducts, newProduct } from "../../api/fetch"
import { useEffect, useState } from "react"

export default function ProductsList({ firstAvailableCode }) {
  const [loaded, setLoaded] = useState(false)
  const [products, setProducts] = useState({ rows: [], totalRows: 0 })
  const [defaultSearchValue, setDefaultSearchValue] = useState("")

  const fetchProducts = async (query: string) => {
    const fetchedProducts = await getProducts(1, ROWS_PER_PAGE, query)
    setProducts({
      rows: fetchedProducts.results,
      totalRows: fetchedProducts.count
    })
    setLoaded(true)
  }

  useEffect(() => {
    const productsSearch = localStorage.getItem(PRODUCTS_SEARCH_LOCAL_STORAGE)
    setDefaultSearchValue(productsSearch)
    fetchProducts(productsSearch)
  }, [])

  const storeSearchValue = (text: string) => {
    localStorage.setItem(PRODUCTS_SEARCH_LOCAL_STORAGE, text)
  }

  return (
    <>
      {loaded && (
        <>
          <PaginatedTable
            title={Models.Product}
            columns={PRODUCT_COLUMNS}
            rows={products.rows}
            totalRows={products.totalRows}
            rowsPerPage={ROWS_PER_PAGE}
            fetchData={getProducts}
            searchInputPlaceholder={"Buscar por Cód., Det. o Cat."}
            defaultSearchValue={defaultSearchValue}
            onChangeSearchValue={storeSearchValue}
          />
          <div className={styles.newProductSection}>
            <h3>Agregar Nuevo Producto</h3>
            <CustomForm
              modelName={"Producto"}
              data={{
                codigo_en_pantalla: firstAvailableCode,
                categoria: PRODUCT_CATEGORIES[0]
              }}
              dataId={null}
              sections={PRODUCT_SECTIONS(fetchAvailableCodes)}
              submitFunction={newProduct}
            />
          </div>
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const productsApi = new ProductsApi(getJWTFromCtx(ctx))
  const availableCodes = await productsApi.getAvailableCodes(1, 1)
  return {
    props: {
      firstAvailableCode: availableCodes.available_codes[0]
    }
  }
}
