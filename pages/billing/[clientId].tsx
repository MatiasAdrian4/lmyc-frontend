import { GetServerSideProps } from "next"
import { ClientsApi, InvoiceItemsApi } from "api/lmycApi"
import {
  downloadInvoicePDF,
  errorPopup,
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage,
  successPopup,
  toFixed2
} from "utils/utils"
import styles from "styles/billing/Billing.module.css"
import { useState } from "react"
import { markInvoiceItemsAsPaid } from "api/fetch"

export default function Billing({ client, invoiceItems }) {
  const [billingItems, setBillingItems] = useState(
    invoiceItems.map((invoiceItem) => ({ ...invoiceItem, ["selected"]: false }))
  )
  const [total, setTotal] = useState(0)

  const calculateTotalToBill = () =>
    billingItems
      .filter((item) => item.selected)
      .reduce(
        (sum, item) => sum + item.producto.precio_venta_cta_cte * item.cantidad,
        0
      )

  const setAllBillingItems = (checked) => {
    billingItems.forEach((billingItem) => (billingItem.selected = checked))
    setBillingItems([...billingItems])
    setTotal(toFixed2(calculateTotalToBill()))
  }

  const setSingleBillingItem = (pos, checked) => {
    billingItems[pos].selected = checked
    setBillingItems([...billingItems])
    setTotal(toFixed2(calculateTotalToBill()))
  }

  const billItems = async () => {
    try {
      await markInvoiceItemsAsPaid({
        items: billingItems
          .filter((item) => item.selected)
          .map((item) => item.id)
      })
      successPopup(`Los items seleccionados fueron facturados correctamente.`)
      setBillingItems(billingItems.filter((item) => !item.selected))
      setTotal(0)
    } catch (error) {
      errorPopup(
        "Ha ocurrido un error al intentar facturar los items seleccionados."
      )
    }
  }

  return (
    <>
      <h3 className={styles.sectionTitle}>Cliente: {client.nombre}</h3>

      <table className={styles.invoiceItemsTable}>
        <thead>
          <tr>
            <th>Producto: Código</th>
            <th>Producto: Detalle</th>
            <th>Precio Cta. Cte.</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  setAllBillingItems(e.target.checked)
                }}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {billingItems.map((billingItem, i) => (
            <tr key={billingItem.id}>
              <td>{billingItem.producto.codigo}</td>
              <td>{billingItem.producto.detalle}</td>
              <td>{billingItem.producto.precio_venta_cta_cte}</td>
              <td>{billingItem.cantidad}</td>
              <td>
                {toFixed2(
                  billingItem.producto.precio_venta_cta_cte *
                    billingItem.cantidad
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={billingItem.selected}
                  onChange={(e) => {
                    setSingleBillingItem(i, e.target.checked)
                  }}
                />
              </td>
              <td>
                <a onClick={() => downloadInvoicePDF(billingItem.remito)}>
                  Remito N°{billingItem.remito}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.billingSection}>
        <input value={total} />
        <button onClick={billItems}>Facturar</button>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const clientsApi = new ClientsApi(getJWTFromCtx(ctx), true)
  const client = await clientsApi.getClient(+ctx.params.clientId)

  const invoiceItemsApi = new InvoiceItemsApi(getJWTFromCtx(ctx), true)
  const invoiceItems = await invoiceItemsApi.getInvoiceItems(
    +ctx.params.clientId,
    false
  )

  return {
    props: {
      client: client,
      invoiceItems: invoiceItems
    }
  }
}
