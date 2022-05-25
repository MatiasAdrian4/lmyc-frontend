import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../styles/NavBar.module.css"

export default function NavBar() {
  const { asPath } = useRouter()

  return (
    <>
      {asPath !== "/" && (
        <nav className={styles.header}>
          <ul>
            <li>
              <Link href="/sales">
                <a>Ventas</a>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <a>Productos</a>
              </Link>
            </li>
            <li>
              <Link href="/clients">
                <a>Clientes</a>
              </Link>
            </li>
            <li>
              <Link href="/invoices">
                <a>Remitos</a>
              </Link>
            </li>
            <li>
              <Link href="/sales-history">
                <a>Historial de Ventas</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Cerrar Sesión</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}
