import { LMYC_JWT } from "../utils/constants"
import {
  UsersApi as LMYCUsersApi,
  ClientsApi as LMYCClientsApi,
  InvoicesApi as LMYCInvoicesApi,
  InvoiceItemsApi as LMYCInvoiceItemsApi,
  FileActionsApi as LMYCFileActionsApi,
  User,
  PaginatedClients,
  Client,
  ExtendedClient
} from "../lmyc_client/api"
import { Configuration } from "../lmyc_client/configuration"

class LMYCApi {
  config: Configuration

  constructor(lmyc_jwt: string = undefined) {
    this.config = new Configuration({
      basePath: process.env.LMYC_BACKEND_HOST,
      baseOptions: {
        withCredentials: true
      }
    })
    if (lmyc_jwt) {
      this.config.baseOptions["headers"] = {
        Cookie: `${LMYC_JWT}=${lmyc_jwt}`
      }
    }
  }
}

class UsersApi extends LMYCApi {
  usersAPI: LMYCUsersApi

  constructor(lmyc_jwt: string = undefined) {
    super(lmyc_jwt)
    this.usersAPI = new LMYCUsersApi(this.config)
  }

  async login(username: string, password: string) {
    await this.usersAPI.accountLoginPost({
      username: username,
      password: password
    })
  }

  async getUser(): Promise<User> {
    try {
      return (await this.usersAPI.accountUserGet()).data
    } catch (err) {
      return undefined
    }
  }
}

class ClientsApi extends LMYCApi {
  clientsAPI: LMYCClientsApi

  constructor(lmyc_jwt: string = undefined) {
    super(lmyc_jwt)
    this.clientsAPI = new LMYCClientsApi(this.config)
  }

  async getClients(
    pageNumber = 1,
    name: string = undefined
  ): Promise<PaginatedClients> {
    try {
      return (await this.clientsAPI.clientesGet(pageNumber, name)).data
    } catch {
      return undefined
    }
  }

  async getClient(clientId: number): Promise<ExtendedClient> {
    try {
      return (await this.clientsAPI.clientesClienteIdGet(clientId)).data
    } catch {
      return undefined
    }
  }

  async updateClient(clientId: number, data: Client) {
    return await this.clientsAPI.clientesClienteIdPatch(clientId, data)
  }
}

class InvoicesApi extends LMYCApi {
  invoicesAPI: LMYCInvoicesApi

  constructor(lmyc_jwt: string = undefined) {
    super(lmyc_jwt)
    this.invoicesAPI = new LMYCInvoicesApi(this.config)
  }

  async getInvoices(pageNumber = 1, name: string = undefined) {
    try {
      return (await this.invoicesAPI.remitosGet(pageNumber, name)).data
    } catch {
      return undefined
    }
  }
}

class InvoiceItemsApi extends LMYCApi {
  invoiceItemsApi: LMYCInvoiceItemsApi

  constructor(lmyc_jwt: string = undefined) {
    super(lmyc_jwt)
    this.invoiceItemsApi = new LMYCInvoiceItemsApi(this.config)
  }

  async getInvoiceItems(
    codigoCliente: number = undefined,
    pago: boolean = undefined
  ) {
    try {
      return (
        await this.invoiceItemsApi.elementosRemitoGet(codigoCliente, pago)
      ).data
    } catch {
      return undefined
    }
  }
}

class FileActionsApi extends LMYCApi {
  fileActionsApi: LMYCFileActionsApi

  constructor(lmyc_jwt: string = undefined) {
    super(lmyc_jwt)
    this.fileActionsApi = new LMYCFileActionsApi(this.config)
  }

  async getInvoicePDF(code: number) {
    return await this.fileActionsApi.generarRemitoPdfGet(code)
  }
}

export { UsersApi, ClientsApi, InvoicesApi, InvoiceItemsApi, FileActionsApi }
