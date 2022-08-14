import { GetServerSideProps } from "next"
import { ProductsApi } from "../../api/lmycApi"
import CustomForm from "../../components/CustomForm"
import PaginatedTable from "../../components/table/PaginatedTable"
import { PRODUCT_COLUMNS } from "../../utils/columns"
import { ROWS_PER_PAGE } from "../../utils/constants"
import { PRODUCT_SECTIONS } from "../../utils/forms"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import styles from "../../styles/products/Products.module.css"
import { Product as ProductModel } from "../../lmyc_client/api"

const getProducts = async (pageNumber: number, pageSize: number, query: string) => {
  const productsApi = new ProductsApi()
  return await productsApi.getProducts(pageNumber, pageSize, "", "", query)
}

const newProduct = async (data: ProductModel) => {
  const productsApi = new ProductsApi()
  return await productsApi.newProduct(data)
}

export default function ProductsList({ paginatedProducts }) {
  return (
    <>
      <PaginatedTable
        columns={PRODUCT_COLUMNS}
        rows={paginatedProducts.results}
        totalRows={paginatedProducts.count}
        rowsPerPage={ROWS_PER_PAGE}
        fetchData={getProducts}
        searchInputPlaceholder={"Buscar por Cód., Det. o Cat."}
      />
      <div className={styles.newProductSection}>
        <h3>Agregar Nuevo Producto</h3>
        <CustomForm
          modelName={"Producto"}
          data={null}
          dataId={null}
          sections={PRODUCT_SECTIONS}
          submitFunction={newProduct}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const productsApi = new ProductsApi(getJWTFromCtx(ctx))
  const paginatedProducts = await productsApi.getProducts()
  return {
    props: {
      paginatedProducts: paginatedProducts
    }
  }
}
