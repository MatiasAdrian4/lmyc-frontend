import NavBar from "components/NavBar"
import { AppContext } from "next/app"
import "styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <NavBar />
      {/*<div className={"watermark"}></div>*/}
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    pageProps: {}
  }
}

export default MyApp
