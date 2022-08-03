import { GetServerSideProps } from "next"
import { ClientsApi } from "../../api/lmycApi"
import CustomForm, { FormSection } from "../../components/CustomForm"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import { Client as ClientModel } from "../../lmyc_client/api"
import { BasicTable } from "../../components/table/BasicTable"
import styles from "../../styles/Client.module.css"
import { CLIENT_INVOICE_COLUMNS } from "../../utils/columns"
import Link from "next/link"

const updateClient = async (clientId: number, data: ClientModel) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.updateClient(clientId, data)
}

export default function Client({ client }) {
  const sections: FormSection[] = [
    {
      title: "Datos Personales",
      fields: [
        { name: "nombre", displayName: "Nombre" },
        { name: "cuit", displayName: "Cuit" }
      ]
    },
    {
      title: "Dirección",
      fields: [
        { name: "direccion", displayName: "Dirección" },
        { name: "localidad", displayName: "Localidad" },
        { name: "codigo_postal", displayName: "Código Postal" }
      ]
    },
    {
      title: "Datos de contacto",
      fields: [
        { name: "telefono", displayName: "Teléfono" },
        { name: "email", displayName: "E-mail" }
      ]
    }
  ]

  return (
    <>
      <h3 className={styles.sectionTitle}>Información del cliente</h3>
      <div className={`${styles.clientSection} ${styles.section}`}>
        <CustomForm
          data={client}
          dataId={client.id}
          sections={sections}
          submitFunction={updateClient}
        />
      </div>
      <h3 className={styles.sectionTitle}>Deudas</h3>
      <div className={`${styles.debtSection} ${styles.section}`}>
        {client.deuda_actual > 0 && (
          <>
            <p>La deuda al dia de la fecha es de ${client.deuda_actual}.</p>
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
          columns={CLIENT_INVOICE_COLUMNS}
          data={client.lista_remitos}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const clientsApi = new ClientsApi(getJWTFromCtx(ctx))
  const client = await clientsApi.getClient(+ctx.params.clientId)

  return {
    props: {
      client: client
    }
  }
}
