import { GetServerSideProps } from "next"
import { isUserAuthenticated, ssRedirectToLoginPage } from "utils/utils"
import styles from "styles/account-summaries/AccountSummaries.module.css"

export default function AccountSummariesList({}) {
  return (
    <>
      <p>Hello</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  return {
    props: {}
  }
}
