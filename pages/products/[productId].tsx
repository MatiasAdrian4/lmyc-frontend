import { GetServerSideProps } from "next"
import { ProductsApi } from "../../api/lmycApi"
import { CustomForm } from "../../components/form/CustomForm"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import styles from "../../styles/products/Product.module.css"
import { PRODUCT_SECTIONS } from "../../components/form/forms"
import { updateProduct } from "../../api/fetch"

export default function Product({ product }) {
  return (
    <>
      <h3 className={styles.sectionTitle}>Información del producto</h3>
      <div className={styles.section}>
        <CustomForm
          modelName={"Producto"}
          data={product}
          dataId={product.codigo}
          sections={PRODUCT_SECTIONS}
          submitFunction={updateProduct}
        />
      </div>
    </>
  )
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
