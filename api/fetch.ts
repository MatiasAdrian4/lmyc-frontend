import {
  Product,
  ExtendedProduct,
  PaginatedProducts,
  AvailableCodesList,
  Client,
  PaginatedClients,
  InvoiceWithInvoiceItems,
  PaginatedInvoices,
  UpdateInvoice,
  SalesList,
  PaginatedSales
} from "../lmyc_client"
import {
  ClientsApi,
  InvoicesApi,
  ProductsApi,
  SalesApi,
  UsersApi
} from "./lmycApi"

/*********************************************************************/
/********** User *****************************************************/
/*********************************************************************/

export const logout = async () => {
  const usersApi = new UsersApi()
  return await usersApi.logout()
}

/*********************************************************************/
/********** Product **************************************************/
/*********************************************************************/

export const getProducts = async (
  pageNumber: number,
  pageSize: number,
  query: string
): Promise<PaginatedProducts> => {
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

export const getAvailableCodes = async (
  start?: number,
  amount?: number
): Promise<AvailableCodesList> => {
  const productsApi = new ProductsApi()
  return await productsApi.getAvailableCodes(start, amount)
}

/*********************************************************************/
/********** Client ***************************************************/
/*********************************************************************/

export const getClients = async (
  pageNumber: number,
  pageSize: number,
  query: string
): Promise<PaginatedClients> => {
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
): Promise<PaginatedInvoices> => {
  const invoicesApi = new InvoicesApi()
  return await invoicesApi.getInvoices(pageNumber, pageSize, nombre)
}

export const newInvoice = async (data: InvoiceWithInvoiceItems) => {
  const invoicesApi = new InvoicesApi()
  return await invoicesApi.newInvoice(data)
}

export const updateInvoice = async (invoiceId: number, data: UpdateInvoice) => {
  const invoicesApi = new InvoicesApi()
  return await invoicesApi.updateInvoice(invoiceId, data)
}

/*********************************************************************/
/********** Sale *****************************************************/
/*********************************************************************/

export const getSales = async (
  pageNumber: number,
  pageSize: number,
  date: string
): Promise<PaginatedSales> => {
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

export const newSalesUpdatingStock = async (data: SalesList) => {
  const salesApi = new SalesApi()
  return await salesApi.bulkSales(data, "true")
}

export const getSalesPerMonth = async (month: string, year: string) => {
  const salesApi = new SalesApi()
  return await salesApi.getSalesPerMonth(month, year)
}

export const getSalesPerYear = async (year: string) => {
  const salesApi = new SalesApi()
  return await salesApi.getSalesPerYear(year)
}
