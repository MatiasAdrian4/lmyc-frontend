"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { UsersApi } from "api/lmycApi"
import styles from "styles/Home.module.css"

export default function LoginForm() {
  const router = useRouter()
  const usersApi = new UsersApi()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData(event.currentTarget)
      await usersApi.login(
        formData.get("username") as string,
        formData.get("password") as string
      )
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
    <form onSubmit={onSubmit} data-cy="login-form" className={styles.signin}>
      <p>{"Lubricentro M&C"}</p>
      <input type="text" id="username" placeholder="Usuario" name="username" />
      <br></br>
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        name="password"
      />
      <br></br>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div>
          <button type="submit">Iniciar Sesión</button>
          <p className={styles.error}>{errorMsg}</p>
        </div>
      )}
    </form>
  )
}
