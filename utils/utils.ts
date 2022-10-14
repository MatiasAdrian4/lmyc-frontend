import { format } from "date-fns"
import { GetServerSidePropsContext } from "next"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import Swal from "sweetalert2"
import { FileActionsApi, UsersApi } from "../api/lmycApi"
import { LMYC_JWT } from "./constants"
import { SimplifiedInvoiceItem } from "../lmyc_client/api"

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

export const formatDate = (value) => {
  return format(new Date(value), "dd/MM/yyyy")
}

export const toFixed2 = (value: number) => {
  return Math.round(value * 1e2) / 1e2
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

export const parseInvoiceItem = (
  invoiceItem: SimplifiedInvoiceItem
): string => {
  return `${invoiceItem.cantidad} und. - ${invoiceItem.producto}`
}

export const successPopup = (message: string) => {
  Swal.fire({
    title: message,
    icon: "success",
    confirmButtonText: "Salir",
    confirmButtonColor: "#a7c13c"
  })
}

export const errorPopup = (message: string) => {
  Swal.fire({
    title: message,
    icon: "error",
    confirmButtonText: "Salir",
    confirmButtonColor: "#a7c13c"
  })
}

export const actionPopup = (
  message: string,
  confirmButtonText: string,
  action: Function
) => {
  Swal.fire({
    title: message,
    icon: "success",
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#a7c13c",
    showCancelButton: true,
    cancelButtonText: "Salir",
    cancelButtonColor: "#a7c13c"
  }).then((result) => {
    if (result.value) {
      action()
    }
  })
}
