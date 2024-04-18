import Link from "next/link"
import { useRouter } from "next/router"
import { logout } from "api/fetch"
import styles from "styles/components/NavBar.module.css"
import { useState } from "react"

export default function NavBar() {
  const { asPath } = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {asPath !== "/" && (
        <nav className={styles.header}>
          <div className={styles.logo} onClick={() => setMenuOpen(!menuOpen)}>
            <span>M&C</span>
          </div>
          <ul
            data-cy="navigation-bar"
            className={`${styles.navigation} ${!menuOpen ? styles.closed : ""}`}
          >
            <li>
              <Link href="/sales">
                <a
                  className={`${asPath == "/sales" ? styles.selectedTab : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Ventas
                </a>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <a
                  className={`${
                    asPath == "/products" ? styles.selectedTab : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Productos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/price-updates">
                <a
                  className={`${
                    asPath == "/price-updates" ? styles.selectedTab : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Actualización de Precios
                </a>
              </Link>
            </li>
            <li>
              <Link href="/clients">
                <a
                  className={`${
                    asPath == "/clients" ? styles.selectedTab : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Clientes
                </a>
              </Link>
            </li>
            <li>
              <Link href="/invoices">
                <a
                  className={`${
                    asPath == "/invoices" ? styles.selectedTab : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Remitos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sales-history">
                <a
                  className={`${
                    asPath == "/sales-history" ? styles.selectedTab : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Historial de Ventas
                </a>
              </Link>
            </li>
            <li>
              <Link href="/graphs">
                <a
                  className={`${asPath == "/graphs" ? styles.selectedTab : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Gráficos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a onClick={logout}>Cerrar Sesión</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}
