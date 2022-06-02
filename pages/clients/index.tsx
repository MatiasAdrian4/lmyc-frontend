import { GetServerSideProps } from "next"
import { ClientsApi } from "../../api/lmycApi"
import { BasicTable } from "../../components/BasicTable"
import {
  get_jwt_from_ctx,
  is_user_authenticated,
  ss_redirect_to_login_page
} from "../../utils"
import { COLUMNS } from "./columns"

export default function ClientList({ clients }) {
  return (
    <>
      <BasicTable columns={COLUMNS} data={clients} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const is_user_logged_in = await is_user_authenticated(ctx)
  if (!is_user_logged_in) {
    return ss_redirect_to_login_page()
  }
  const clientsApi = new ClientsApi(get_jwt_from_ctx(ctx))
  const clients = (await clientsApi.getClients()).results
  return {
    props: {
      clients: clients
    }
  }
}
