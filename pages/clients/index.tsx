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
import styles from "../../styles/clients/Clients.module.css"
import CustomForm from "../../components/CustomForm"
import { CLIENT_SECTIONS } from "../../utils/forms"
import { Client as ClientModel } from "../../lmyc_client/api"

const getClients = async (pageNumber: number, name: string) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.getClients(pageNumber, name)
}

const newClient = async (data: ClientModel) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.newClient(data)
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
      <div className={styles.newClientSection}>
        <h2>Agregar Nuevo Cliente</h2>
        <CustomForm
          modelName={"Cliente"}
          data={null}
          dataId={null}
          sections={CLIENT_SECTIONS}
          submitFunction={newClient}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const clientsApi = new ClientsApi(getJWTFromCtx(ctx))
  const paginatedClients = await clientsApi.getClients()
  return {
    props: {
      paginatedClients: paginatedClients
    }
  }
}
