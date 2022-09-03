import { GetServerSideProps } from "next"
import { InvoicesApi } from "../../api/lmycApi"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"

export default function Invoice({ invoice }) {
  return (
    <>
      <p>{JSON.stringify(invoice)}</p>
      {/** Add the possibility to edit the current invoice items and add new ones */}
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
