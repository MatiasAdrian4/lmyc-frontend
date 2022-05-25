import { GetServerSideProps } from "next"
import { is_user_authenticated, ss_redirect_to_login_page } from "../../utils"

export default function ProductsList({ products }) {
  return (
    <>
      <h1>{`List of products ${products}`}</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const is_user_logged_in = await is_user_authenticated(ctx)
  if (!is_user_logged_in) {
    return ss_redirect_to_login_page()
  }
  return {
    props: {}
  }
}
