import { GetServerSideProps } from "next"
import { ClientsApi } from "../../api/lmycApi"
import { CLIENT_COLUMNS } from "../../utils/columns"
import PaginatedTable from "../../components/table/PaginatedTable"
import { ROWS_PER_PAGE } from "../../utils/constants"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"

export const getClients = async (pageNumber: number, name: string) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.getClients(pageNumber, name)
}

export default function ClientList({ paginatedClients }) {
  return (
    <>
      <PaginatedTable
        columns={CLIENT_COLUMNS}
        rows={paginatedClients.results}
        totalRows={paginatedClients.count}
        rowsPerPage={ROWS_PER_PAGE}
        fetchData={getClients}
        searchInputPlaceholder={"Buscar por nombre"}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserLoggedIn = await isUserAuthenticated(ctx)
  if (!isUserLoggedIn) {
    return ssRedirectToLoginPage()
  }

  const clientsApi = new ClientsApi(getJWTFromCtx(ctx))
  const paginatedClients = await clientsApi.getClients()
  return {
    props: {
      paginatedClients: paginatedClients
    }
  }
}
