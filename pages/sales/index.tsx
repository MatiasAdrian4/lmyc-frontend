import { GetServerSideProps } from "next"
import { isUserAuthenticated, ssRedirectToLoginPage } from "../../utils"

export default function SalesList() {
  return (
    <>
      <h1>Sales Page</h1>
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
