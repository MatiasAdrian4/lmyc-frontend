import { GetServerSideProps } from "next"
import { ClientsApi } from "api/lmycApi"
import { CustomForm } from "components/form/CustomForm"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "utils/utils"
import { BasicTable } from "components/table/BasicTable"
import styles from "styles/clients/Client.module.css"
import { CLIENT_INVOICE_COLUMNS } from "components/table/columns"
import Link from "next/link"
import { CLIENT_SECTIONS } from "components/form/forms"
import { updateClient } from "api/fetch"
import { Models } from "utils/constants"

export default function Client({ client }) {
  return (
    <>
      <h3 className={styles.sectionTitle}>Información del Cliente</h3>
      <div className={`${styles.clientSection} ${styles.section}`}>
        <CustomForm
          modelName={"Cliente"}
          data={client}
          dataId={client.id}
          sections={CLIENT_SECTIONS}
          submitFunction={updateClient}
        />
      </div>
      <h3 className={styles.sectionTitle}>Deudas</h3>
      <div
        data-cy="client-debts"
        className={`${styles.debtSection} ${styles.section}`}
      >
        {client.deuda_actual > 0 && (
          <>
            <p>
              La deuda al dia de la fecha es de $
              {client.deuda_actual.toFixed(2)}.
            </p>
            <Link href={`/billing/${client.id}`}>
              <button type="button">Ir a pantalla de cobros</button>
            </Link>
          </>
        )}
        {client.deuda_actual == 0 && <p>No posee ninguna deuda.</p>}
      </div>
      <h3 className={styles.sectionTitle}>Historial de remitos</h3>
      <div className={`${styles.invoicesSection} ${styles.section}`}>
        <BasicTable
          title={Models.Client}
          columns={CLIENT_INVOICE_COLUMNS}
          data={client.lista_remitos}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const clientsApi = new ClientsApi(getJWTFromCtx(ctx), true)
  const client = await clientsApi.getClient(+ctx.params.clientId)

  return {
    props: {
      client: client
    }
  }
}
