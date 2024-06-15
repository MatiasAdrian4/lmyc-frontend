import LoginForm from "./login-form"
import { cookies } from "next/headers"
import { isUserAuthenticated } from "./lib/utils"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookieStore = cookies()

  if (await isUserAuthenticated(cookieStore)) {
    redirect("/sales")
  }

  return <LoginForm />
}
