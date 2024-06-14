"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { UsersApi } from "api/lmycApi"
import styles from "styles/Home.module.css"

export default function LoginForm() {
  const router = useRouter()
  const usersApi = new UsersApi()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const login = async () => {
    setIsLoading(true)
    try {
      await usersApi.login(username, password)
      setIsLoading(false)
      setErrorMsg("")
      router.push("/sales")
    } catch (err) {
      setIsLoading(false)
      if (err.status == 403) {
        setErrorMsg("Usuario o contraseña incorrectos.")
      } else {
        setErrorMsg("Se ha producido un error.")
      }
    }
  }

  return (
    // TODO: use "form" instead
    <div data-cy="login-form" className={styles.signin}>
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
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div>
          <button type="button" onClick={login}>
            Iniciar Sesión
          </button>
          <p className={styles.error}>{errorMsg}</p>
        </div>
      )}
    </div>
  )
}
