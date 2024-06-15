import { UsersApi } from "api/lmycApi"

export async function isUserAuthenticated(cookies): Promise<boolean> {
  const usersApi = new UsersApi(cookies.get("lmyc_jwt")?.value, true)
  const user = await usersApi.getUser()
  return user ? true : false
}
