import { GetServerSidePropsContext } from "next"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { UsersApi } from "./api/lmycApi"
import { LMYC_JWT } from "./constants"

export const getJWTFromCtx = (ctx: GetServerSidePropsContext) => {
  const cookies: NextApiRequestCookies = ctx.req.cookies
  return cookies[LMYC_JWT]
}

export const isUserAuthenticated = async (ctx: GetServerSidePropsContext) => {
  const usersApi = new UsersApi(getJWTFromCtx(ctx))
  const user = await usersApi.getUser()
  return user ? true : false
}

export const ssRedirectToSalesPage = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/sales"
    }
  }
}

export const ssRedirectToLoginPage = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/"
    }
  }
}
