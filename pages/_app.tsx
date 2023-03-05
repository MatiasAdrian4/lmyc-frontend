import NavBar from "components/NavBar"
import "styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <div className={"watermark"}></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
