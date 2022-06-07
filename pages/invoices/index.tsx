import { GetServerSideProps } from "next"
import { InvoicesApi } from "../../api/lmycApi"
import PaginatedTable from "../../components/PaginatedTable"
import { ROWS_PER_PAGE } from "../../constants"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils"
import { COLUMNS } from "./columns"

export const getInvoices = async (pageNumber: number, nombre: string) => {
  const invoicesApi = new InvoicesApi()
  return await invoicesApi.getInvoices(pageNumber, nombre)
}

export default function InvoicesList({ paginatedInvoices }) {
  return (
    <>
      <PaginatedTable
        columns={COLUMNS}
        rows={paginatedInvoices.results}
        totalRows={paginatedInvoices.count}
        rowsPerPage={ROWS_PER_PAGE}
        fetchData={getInvoices}
        searchInputPlaceholder={"Buscar por nombre de cliente"}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserLoggedIn = await isUserAuthenticated(ctx)
  if (!isUserLoggedIn) {
    return ssRedirectToLoginPage()
  }

  const invoicesApi = new InvoicesApi(getJWTFromCtx(ctx))
  const paginatedInvoices = await invoicesApi.getInvoices()
  return {
    props: {
      paginatedInvoices: paginatedInvoices
    }
  }
}
