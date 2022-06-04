import { GetServerSideProps } from "next"
import { ClientsApi } from "../../api/lmycApi"
import PaginatedTable from "../../components/PaginatedTable"
import { ROWS_PER_PAGE } from "../../constants"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils"
import { COLUMNS } from "./columns"

export const getClients = async (pageNumber: number, nombre: string) => {
  const clientsApi = new ClientsApi()
  return (await clientsApi.getClients(pageNumber, nombre))
}

export default function ClientList({ paginatedClients }) {
  return (
    <>
      <PaginatedTable
        columns={COLUMNS}
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
  const paginatedClients = (await clientsApi.getClients())
  return {
    props: {
      paginatedClients: paginatedClients
    }
  }
}
