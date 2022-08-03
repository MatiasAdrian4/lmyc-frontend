import { GetServerSideProps } from "next"
import { ProductsApi } from "../../api/lmycApi"
import CustomForm, { FormSection } from "../../components/CustomForm"
import {
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import { ExtendedProduct as ProductModel } from "../../lmyc_client/api"
import styles from "../../styles/Product.module.css"

const updateProduct = async (productId: number, data: ProductModel) => {
  const productsApi = new ProductsApi()
  return await productsApi.updateProduct(productId, data)
}

export default function Product({ product }) {
  const sections: FormSection[] = [
    {
      title: "Descripción",
      fields: [
        { name: "codigo_en_pantalla", displayName: "Código" },
        { name: "detalle", displayName: "Detalle" },
        { name: "categoria", displayName: "Categoría" }
      ]
    },
    {
      title: "Disponibilidad",
      fields: [{ name: "stock", displayName: "Stock" }]
    },
    {
      title: "Precio",
      fields: [{ name: "precio_costo", displayName: "Precio de Costo" }]
    },
    {
      title: "Descuentos (en %)",
      fields: [
        { name: "desc1", displayName: "Desc. 1" },
        { name: "desc2", displayName: "Desc. 2" },
        { name: "desc3", displayName: "Desc. 3" },
        { name: "desc4", displayName: "Desc. 4" }
      ]
    },
    {
      title: "Agregados (en %)",
      fields: [
        { name: "flete", displayName: "Flete" },
        { name: "ganancia", displayName: "Ganancia" },
        { name: "iva", displayName: "Iva" },
        { name: "agregado_cta_cte", displayName: "Agregado Cta. Cte." }
      ]
    }
  ]

  return (
    <>
      <h3 className={styles.sectionTitle}>Información del producto</h3>
      <div className={styles.section}>
        <CustomForm
          data={product}
          dataId={product.codigo}
          sections={sections}
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
