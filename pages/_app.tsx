import NavBar from "components/NavBar"
import { AppContext } from "next/app"
import "styles/globals.css"
import { isMobile } from "utils/utils"

function MyApp({ Component, pageProps }) {
  if (pageProps.isMobile) {
    return (
      <div className={"mobileErrorMsg"}>
        Lubricentro M&C no se encuentra disponible en dispositivos móviles por
        el momento.
      </div>
    )
  }
  return (
    <>
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
