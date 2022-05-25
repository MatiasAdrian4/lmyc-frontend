import { GetServerSidePropsContext } from "next"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { UsersApi } from "./api/lmycApi"
import { LMYC_JWT } from "./constants"

export const get_jwt_from_ctx = (ctx: GetServerSidePropsContext) => {
  const cookies: NextApiRequestCookies = ctx.req.cookies
  return cookies[LMYC_JWT]
}

export const is_user_authenticated = async (ctx: GetServerSidePropsContext) => {
  const usersApi = new UsersApi(get_jwt_from_ctx(ctx))
  const user = await usersApi.getUser()
  return user ? true : false
}

export const ss_redirect_to_sales_page = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/sales"
    }
  }
}

export const ss_redirect_to_login_page = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/"
    }
  }
}
