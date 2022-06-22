import { GetServerSideProps } from "next"
import { ClientsApi } from "../../api/lmycApi"
import { FormSection, CustomForm } from "../../components/CustomForm"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils"
import { Client as ClientModel } from "../../lmyc_client/api"

export const updateClient = async (clientId: number, data: ClientModel) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.updateClient(clientId, data)
}

export default function Client({ client }) {
  const sections: FormSection[] = [
    {
      name: "Datos Personales",
      fields: ["nombre", "cuit"]
    },
    {
      name: "Dirección",
      fields: ["direccion", "localidad", "codigo_postal"]
    },
    {
      name: "Datos de contacto",
      fields: ["telefono", "email"]
    }
  ]

  return (
    <>
      <CustomForm
        data={client}
        sections={sections}
        updateFunction={updateClient}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserLoggedIn = await isUserAuthenticated(ctx)
  if (!isUserLoggedIn) {
    return ssRedirectToLoginPage()
  }

  const { params } = ctx
  const clientsApi = new ClientsApi(getJWTFromCtx(ctx))
  const client = await clientsApi.getClient(params.clientId)
  return {
    props: {
      client: client
    }
  }
}
