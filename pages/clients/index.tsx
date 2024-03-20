import { GetServerSideProps } from "next"
import { ClientsApi } from "api/lmycApi"
import { CLIENT_COLUMNS } from "components/table/columns"
import { PaginatedTable } from "components/table/PaginatedTable"
import { Models, ROWS_PER_PAGE } from "utils/constants"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "utils/utils"
import styles from "styles/clients/Clients.module.css"
import { CustomForm } from "components/form/CustomForm"
import { CLIENT_SECTIONS } from "components/form/forms"
import { getClients, newClient } from "api/fetch"
import { useState } from "react"

export default function ClientList({ paginatedClients }) {
  const [displayAddNewClientForm, setDisplayAddNewClientForm] = useState(false)

  return (
    <>
      <PaginatedTable
        title={Models.Client}
        columns={CLIENT_COLUMNS}
        rows={paginatedClients.results}
        totalRows={paginatedClients.count}
        rowsPerPage={ROWS_PER_PAGE}
        fetchData={getClients}
        searchInputPlaceholder={"Buscar por Cód. o Nombre"}
      />
      <div className={styles.newClientSection}>
        <h3
          onClick={() => setDisplayAddNewClientForm(!displayAddNewClientForm)}
        >
          Agregar Nuevo Cliente
          {displayAddNewClientForm ? (
            <span className={styles.triangle}>△</span>
          ) : (
            <span className={styles.triangle}>▽</span>
          )}
        </h3>
        {displayAddNewClientForm && (
          <CustomForm
            modelName={"Cliente"}
            data={null}
            dataId={null}
            sections={CLIENT_SECTIONS}
            submitFunction={newClient}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const clientsApi = new ClientsApi(getJWTFromCtx(ctx), true)
  const paginatedClients = await clientsApi.getClients()
  return {
    props: {
      paginatedClients: paginatedClients
    }
  }
}
