import { GetServerSidePropsContext } from "next"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { FileActionsApi, UsersApi } from "../api/lmycApi"
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

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const downloadInvoicePDF = async (code: number) => {
  const fileActionsApi = new FileActionsApi()
  const pdf = await fileActionsApi.getInvoicePDF(code)
  const url = window.URL.createObjectURL(new Blob([pdf.data as any]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `remito_${code}.pdf`)
  document.body.appendChild(link)
  link.click()
}
