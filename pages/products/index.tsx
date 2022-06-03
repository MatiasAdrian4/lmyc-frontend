import { GetServerSideProps } from "next"
import { isUserAuthenticated, ssRedirectToLoginPage } from "../../utils"

export default function ProductsList({ products }) {
  return (
    <>
      <h1>{`List of products ${products}`}</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const is_user_logged_in = await isUserAuthenticated(ctx)
  if (!is_user_logged_in) {
    return ssRedirectToLoginPage()
  }
  return {
    props: {}
  }
}
