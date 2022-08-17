import { GetServerSideProps } from "next"
import { ClientsApi } from "../../api/lmycApi"
import { CLIENT_COLUMNS } from "../../components/table/columns"
import { PaginatedTable } from "../../components/table/PaginatedTable"
import { ROWS_PER_PAGE } from "../../utils/constants"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import styles from "../../styles/clients/Clients.module.css"
import { CustomForm } from "../../components/form/CustomForm"
import { CLIENT_SECTIONS } from "../../components/form/forms"
import { getClients, newClient } from "../../api/fetch"

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
        <h3>Agregar Nuevo Cliente</h3>
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
