import { Client, ExtendedProduct, Product } from "../lmyc_client"
import { ClientsApi, InvoicesApi, ProductsApi, SalesApi } from "./lmycApi"

/*********************************************************************/
/********** Product **************************************************/
/*********************************************************************/

export const getProducts = async (
  pageNumber: number,
  pageSize: number,
  query: string
) => {
  const productsApi = new ProductsApi()
  return await productsApi.getProducts(pageNumber, pageSize, "", "", query)
}

export const newProduct = async (data: Product) => {
  const productsApi = new ProductsApi()
  return await productsApi.newProduct(data)
}

export const updateProduct = async (
  productId: number,
  data: ExtendedProduct
) => {
  const productsApi = new ProductsApi()
  return await productsApi.updateProduct(productId, data)
}

/*********************************************************************/
/********** Client ***************************************************/
/*********************************************************************/

export const getClients = async (
  pageNumber: number,
  pageSize: number,
  query: string
) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.getClients(pageNumber, pageSize, "", query)
}

export const newClient = async (data: Client) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.newClient(data)
}

export const updateClient = async (clientId: number, data: Client) => {
  const clientsApi = new ClientsApi()
  return await clientsApi.updateClient(clientId, data)
}

/*********************************************************************/
/********** Invoice **************************************************/
/*********************************************************************/

export const getInvoices = async (
  pageNumber: number,
  pageSize: number,
  nombre: string
) => {
  const invoicesApi = new InvoicesApi()
  return await invoicesApi.getInvoices(pageNumber, pageSize, nombre)
}

/*********************************************************************/
/********** Sale *****************************************************/
/*********************************************************************/

export const getSales = async (
  pageNumber: number,
  pageSize: number,
  date: string
) => {
  if (!date) {
    return { count: 0, next: null, previous: null, results: [] }
  }

  const salesApi = new SalesApi()
  const splitDate = date.split("/")
  switch (splitDate.length) {
    case 3: {
      return await salesApi.getSales(
        pageNumber,
        pageSize,
        splitDate[0],
        splitDate[1],
        splitDate[2]
      )
    }
    case 2: {
      return await salesApi.getSales(
        pageNumber,
        pageSize,
        "",
        splitDate[0],
        splitDate[1]
      )
    }
    case 1: {
      return await salesApi.getSales(pageNumber, pageSize, "", "", splitDate[0])
    }
    default: {
      return { count: 0, next: null, previous: null, results: [] }
    }
  }
}
