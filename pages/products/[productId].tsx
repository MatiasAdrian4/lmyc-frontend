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
        { name: "codigo_en_pantalla", displayName: "Código", width: "50px" },
        { name: "detalle", displayName: "Detalle", width: "300px" },
        { name: "categoria", displayName: "Categoría", width: "150px" }
      ]
    },
    {
      title: "Disponibilidad",
      fields: [{ name: "stock", displayName: "Stock", width: "50px" }]
    },
    {
      title: "Precio",
      fields: [{ name: "precio_costo", displayName: "Precio de Costo", width: "100px" }]
    },
    {
      title: "Descuentos (en %)",
      fields: [
        { name: "desc1", displayName: "# 1", width: "50px" },
        { name: "desc2", displayName: "# 2", width: "50px" },
        { name: "desc3", displayName: "# 3", width: "50px" },
        { name: "desc4", displayName: "# 4", width: "50px" }
      ]
    },
    {
      title: "Agregados (en %)",
      fields: [
        { name: "flete", displayName: "Flete", width: "50px" },
        { name: "ganancia", displayName: "Ganancia", width: "50px" },
        { name: "iva", displayName: "Iva", width: "50px" },
        { name: "agregado_cta_cte", displayName: "Agregado Cta. Cte.", width: "50px" }
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
