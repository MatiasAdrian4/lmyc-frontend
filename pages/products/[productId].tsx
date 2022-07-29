import { GetServerSideProps } from "next"
import { ProductsApi } from "../../api/lmycApi"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"

export default function Product({ product }) {
  return <p>{JSON.stringify(product)}</p>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserLoggedIn = await isUserAuthenticated(ctx)
  if (!isUserLoggedIn) {
    return ssRedirectToLoginPage()
  }

  const { params } = ctx
  const jwt = getJWTFromCtx(ctx)

  const productsApi = new ProductsApi(jwt)
  const product = await productsApi.getProduct(+params.productId)

  return {
    props: {
      product: product
    }
  }
}
