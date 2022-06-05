import { GetServerSideProps } from "next"
import { isUserAuthenticated, ssRedirectToLoginPage } from "../../utils"

export default function InvoicesList({ invoices }) {
  return (
    <>
      <h1>{`List of invoices ${invoices}`}</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserLoggedIn = await isUserAuthenticated(ctx)
  if (!isUserLoggedIn) {
    return ssRedirectToLoginPage()
  }
  
  return {
    props: {}
  }
}
