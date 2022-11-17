import { GetServerSideProps } from "next"
import { InvoicesApi } from "../../api/lmycApi"
import { INVOICE_COLUMNS } from "../../components/table/columns"
import { PaginatedTable } from "../../components/table/PaginatedTable"
import { Models, ROWS_PER_PAGE } from "../../utils/constants"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import { getInvoices } from "../../api/fetch"

export default function InvoicesList({ paginatedInvoices }) {
  return (
    <>
      <PaginatedTable
        title={Models.Invoice}
        columns={INVOICE_COLUMNS}
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
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const invoicesApi = new InvoicesApi(getJWTFromCtx(ctx))
  const paginatedInvoices = await invoicesApi.getInvoices()
  return {
    props: {
      paginatedInvoices: paginatedInvoices
    }
  }
}
