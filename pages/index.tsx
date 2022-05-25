import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { UsersApi } from "../api/lmycApi"
import styles from "../styles/Home.module.css"
import { is_user_authenticated, ss_redirect_to_sales_page } from "../utils"

export default function Home() {
  const router = useRouter()
  const usersApi = new UsersApi()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const login = async () => {
    try {
      await usersApi.login(username, password)
      setErrorMsg("")
      router.push("/sales")
    } catch (err) {
      if (err.status == 403) {
        setErrorMsg("Usuario o contraseña incorrectos.")
      } else {
        setErrorMsg("Se ha producido un error. Intente de nuevo mas tarde.")
      }
    }
  }

  return (
    <div className={styles.signin}>
      <p>{"Lubricentro M&C"}</p>
      <input
        type="text"
        id="username"
        placeholder="Usuario"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br></br>
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br></br>
      <button type="button" onClick={login}>
        Iniciar Sesión
      </button>
      <p className={styles.error}>{errorMsg}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const is_user_logged_in = await is_user_authenticated(ctx)
  if (is_user_logged_in) {
    return ss_redirect_to_sales_page()
  }
  return {
    props: {}
  }
}
