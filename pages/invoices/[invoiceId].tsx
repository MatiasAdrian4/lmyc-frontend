import { GetServerSideProps } from "next"
import { InvoicesApi } from "../../api/lmycApi"
import {
  formatDate,
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import styles from "../../styles/invoices/Invoice.module.css"

export default function Invoice({ invoice }) {
  return (
    <>
      <h3 className={styles.sectionTitle}>Información del Remito</h3>
      <div className={styles.section}>
        <fieldset>
          <label>Código</label>
          <input readOnly={true} type="text" value={invoice.codigo} style={{ width: "100px" }}></input>
          <label>Cliente</label>
          <input readOnly={true} type="text" value={invoice.cliente} style={{ width: "200px" }}></input>
          <label>Fecha</label>
          <input
            readOnly={true}
            type="text"
            value={formatDate(invoice.fecha)}
            style={{ width: "100px" }}
          ></input>
        </fieldset>
        <p>{JSON.stringify(invoice.resumen_elementos)}</p>
        {/** Add the possibility to edit the current invoice items and add new ones */}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const invoicesApi = new InvoicesApi(getJWTFromCtx(ctx))
  const invoice = await invoicesApi.getInvoice(+ctx.params.invoiceId)

  return {
    props: {
      invoice: invoice
    }
  }
}
