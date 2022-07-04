import { GetServerSideProps } from "next"
import { isUserAuthenticated, ssRedirectToLoginPage } from "../../utils/utils"

export default function ProductsList({ products }) {
  return (
    <>
      <h1>{`List of products ${products}`}</h1>
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
