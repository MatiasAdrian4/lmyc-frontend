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
              <Link
                href="/sales"
                className={`${asPath == "/sales" ? styles.selectedTab : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Ventas
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`${asPath == "/products" ? styles.selectedTab : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/price-updates"
                className={`${
                  asPath == "/price-updates" ? styles.selectedTab : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Act. de Precios
              </Link>
            </li>
            <li>
              <Link
                href="/clients"
                className={`${asPath == "/clients" ? styles.selectedTab : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/invoices"
                className={`${asPath == "/invoices" ? styles.selectedTab : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Remitos
              </Link>
            </li>
            <li>
              <Link
                href="/sales-history"
                className={`${
                  asPath == "/sales-history" ? styles.selectedTab : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Historial de Ventas
              </Link>
            </li>
            <li>
              <Link
                href="/account-summaries"
                className={`${
                  asPath == "/account-summaries" ? styles.selectedTab : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Resumenes
              </Link>
            </li>
            <li>
              <Link
                href="/graphs"
                className={`${asPath == "/graphs" ? styles.selectedTab : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Gráficos
              </Link>
            </li>
            <li>
              <Link href="/" onClick={logout}>
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}
