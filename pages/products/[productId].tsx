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
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const productsApi = new ProductsApi(getJWTFromCtx(ctx))
  const product = await productsApi.getProduct(+ctx.params.productId)

  return {
    props: {
      product: product
    }
  }
}
