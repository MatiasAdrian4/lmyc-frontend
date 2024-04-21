import NavBar from "components/NavBar"
import { AppContext } from "next/app"
import "styles/globals.css"
import { isMobile } from "utils/utils"

function MyApp({ Component, pageProps }) {
  /*if (pageProps.isMobile) {
    return <div className={"mobileErrorMsg"}></div>
  }*/
  return (
    <>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <NavBar />
      <div className={"watermark"}></div>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    pageProps: {
      isMobile: isMobile(appContext.ctx)
    }
  }
}

export default MyApp
