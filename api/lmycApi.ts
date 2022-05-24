import { LMYC_JWT } from "../constants"
import {
  UsersApi as LMYCUsersApi,
  ClientsApi as LMYCClientsApi,
  Client
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
    return await this.usersAPI.accountLoginPost({
      username: username,
      password: password
    })
  }
}

class ClientsApi extends LMYCApi {
  clientsAPI: LMYCClientsApi

  constructor(lmyc_jwt: string = undefined) {
    super(lmyc_jwt)
    this.clientsAPI = new LMYCClientsApi(this.config)
  }

  async getClients(): Promise<Client[]> {
    try {
      return (await this.clientsAPI.clientesGet()).data
    } catch {
      return []
    }
  }
}

export { UsersApi, ClientsApi }
