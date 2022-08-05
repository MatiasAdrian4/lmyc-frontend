import { GetServerSideProps } from "next"
import { ProductsApi } from "../../api/lmycApi"
import PaginatedTable from "../../components/table/PaginatedTable"
import { PRODUCT_COLUMNS } from "../../utils/columns"
import { ROWS_PER_PAGE } from "../../utils/constants"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"

const getProducts = async (pageNumber: number, query: string) => {
  const productsApi = new ProductsApi()
  return await productsApi.getProducts(pageNumber, "", "", query)
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
