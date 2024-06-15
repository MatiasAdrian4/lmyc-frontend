import { GetServerSideProps } from "next"
import { InvoicesApi } from "api/lmycApi"
import {
  errorPopup,
  formatDate,
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage,
  successPopup
} from "utils/utils"
import styles from "styles/invoices/Invoice.module.css"
import { useState } from "react"
import { updateInvoice } from "api/fetch"

export default function Invoice({ invoice }) {
  const [invoiceItems, setInvoiceItems] = useState(invoice.resumen_elementos)
  const [updating, setUpdating] = useState(false)

  const invoiceCanBeUpdated = (): boolean => {
    return !invoiceItems.map((invoiceItem) => invoiceItem.pagado).includes(true)
  }

  const updateInvoiceItemQuantity = (index: number, value: number) => {
    invoiceItems[index].cantidad = value
    setInvoiceItems([...invoiceItems])
  }

  const deleteInvoiceItem = (index: number) => {
    invoiceItems.splice(index, 1)
    setInvoiceItems([...invoiceItems])
  }

  const saveChanges = async () => {
    try {
      await updateInvoice(invoice.codigo, {
        elementos_remito: invoiceItems.map((invoiceItem) => ({
          id: invoiceItem.id,
          cantidad: invoiceItem.cantidad
        }))
      })
      successPopup("Remito actualizado satisfactoriamente.")
      setUpdating(false)
    } catch {
      errorPopup("Ha ocurrido un error al intentar actualizar el remito.")
    }
  }

  return (
    <>
      <h3 className={styles.sectionTitle}>Información del Remito</h3>
      <div className={styles.section}>
        <fieldset>
          <label>Código</label>
          <input
            readOnly={true}
            type="text"
            value={invoice.codigo}
            style={{ width: "100px" }}
          ></input>
          <label>Cliente</label>
          <input
            readOnly={true}
            type="text"
            value={invoice.cliente.nombre}
            style={{ width: "200px" }}
          ></input>
          <label>Fecha</label>
          <input
            readOnly={true}
            type="text"
            value={formatDate(invoice.fecha)}
            style={{ width: "100px" }}
          ></input>
        </fieldset>
      </div>
      <h3 className={styles.sectionTitle}>Productos</h3>
      <table className={styles.invoiceItemsTable}>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Producto: Código</th>
            <th style={{ width: "60%" }}>Producto: Detalle</th>
            <th style={{ width: "20%" }}>Cantidad</th>
            {invoiceCanBeUpdated() && <th></th>}
          </tr>
        </thead>
        {
          <tbody>
            {invoiceItems.map((invoiceItem, i) => (
              <tr key={invoiceItem.producto.codigo}>
                <td>{invoiceItem.producto.codigo}</td>
                <td>{invoiceItem.producto.detalle}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={invoiceItem.cantidad}
                    onChange={(e) => {
                      setUpdating(true)
                      updateInvoiceItemQuantity(i, +e.target.value)
                    }}
                  />
                </td>
                {invoiceCanBeUpdated() && (
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        setUpdating(true)
                        deleteInvoiceItem(i)
                      }}
                    >
                      X
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        }
      </table>
      <div className={styles.submitSection}>
        {invoiceCanBeUpdated() ? (
          <button
            className={styles.submitButton}
            disabled={!updating}
            onClick={saveChanges}
          >
            Actualizar Remito
          </button>
        ) : (
          <p>
            Este remito no puede ser actualizado ya que 1 ó mas productos ya
            fueron pagos.
          </p>
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const invoicesApi = new InvoicesApi(getJWTFromCtx(ctx), true)
  const invoice = await invoicesApi.getInvoice(+ctx.params?.invoiceId!)

  return {
    props: {
      invoice: invoice
    }
  }
}
