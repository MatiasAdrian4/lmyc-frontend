import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../styles/components/NavBar.module.css"

export default function NavBar() {
  const { asPath } = useRouter()

  return (
    <>
      {asPath !== "/" && (
        <nav className={styles.header}>
          <ul>
            <li>
              <Link href="/sales">
                <a
                  className={`${asPath == "/sales" ? styles.selectedTab : ""}`}
                >
                  Ventas
                </a>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <a
                  className={`${asPath == "/products" ? styles.selectedTab : ""}`}
                >
                  Productos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/clients">
                <a
                  className={`${asPath == "/clients" ? styles.selectedTab : ""}`}
                >
                  Clientes
                </a>
              </Link>
            </li>
            <li>
              <Link href="/invoices">
                <a
                  className={`${asPath == "/invoices" ? styles.selectedTab : ""}`}
                >
                  Remitos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sales-history">
                <a
                  className={`${asPath == "/sales-history" ? styles.selectedTab : ""}`}
                >
                  Historial de Ventas
                </a>
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
