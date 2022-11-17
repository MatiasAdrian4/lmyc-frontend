import { GetServerSideProps } from "next"
import { ProductsApi } from "../../api/lmycApi"
import { CustomForm } from "../../components/form/CustomForm"
import {
  fetchAvailableCodes,
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import styles from "../../styles/products/Product.module.css"
import { PRODUCT_SECTIONS } from "../../components/form/forms"
import { updateProduct } from "../../api/fetch"
import { BasicTable } from "../../components/table/BasicTable"
import { PRODUCT_HISTORY_PRICES_COLUMNS } from "../../components/table/columns"
import { Models } from "../../utils/constants"

export default function Product({ product, historyPrices }) {
  return (
    <>
      <h3 className={styles.sectionTitle}>Información del Producto</h3>
      <div className={styles.section}>
        <CustomForm
          modelName={"Producto"}
          data={product}
          dataId={product.codigo}
          sections={PRODUCT_SECTIONS(fetchAvailableCodes)}
          submitFunction={updateProduct}
        />
      </div>
      <h3 className={styles.sectionTitle}>Historial de Precios</h3>
      <div className={styles.historyPricesSection}>
        <BasicTable
          title={Models.Product}
          columns={PRODUCT_HISTORY_PRICES_COLUMNS}
          data={historyPrices.prices}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const productsApi = new ProductsApi(getJWTFromCtx(ctx))
  const product = await productsApi.getProduct(+ctx.params.productId)
  const historyPrices = await productsApi.getProductHistory(
    +ctx.params.productId
  )

  return {
    props: {
      product: product,
      historyPrices: historyPrices
    }
  }
}
