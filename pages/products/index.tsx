import { GetServerSideProps } from "next"
import { ProductsApi } from "api/lmycApi"
import { CustomForm } from "components/form/CustomForm"
import { PaginatedTable } from "components/table/PaginatedTable"
import { PRODUCT_COLUMNS } from "components/table/columns"
import { Models, PRODUCT_CATEGORIES, ROWS_PER_PAGE } from "utils/constants"
import { PRODUCT_SECTIONS } from "components/form/forms"
import {
  fetchAvailableCodes,
  getJWTFromCtx,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "utils/utils"
import styles from "styles/products/Products.module.css"
import { getProducts, newProduct } from "api/fetch"
import { useState } from "react"

export default function ProductsList({
  paginatedProducts,
  firstAvailableCode
}) {
  const [displayAddNewProductForm, setDisplayAddNewProductForm] =
    useState(false)

  return (
    <>
      <PaginatedTable
        title={Models.Product}
        columns={PRODUCT_COLUMNS}
        rows={paginatedProducts.results}
        totalRows={paginatedProducts.count}
        rowsPerPage={ROWS_PER_PAGE}
        fetchData={getProducts}
        searchInputPlaceholder={"Buscar por Cód., Det. o Cat."}
      />
      <div className={styles.newProductSection}>
        <h3
          data-cy="open-new-product-form"
          onClick={() => setDisplayAddNewProductForm(!displayAddNewProductForm)}
        >
          Agregar Nuevo Producto
          {!displayAddNewProductForm ? (
            <span className={styles.triangle}>△</span>
          ) : (
            <span className={styles.triangle}>▽</span>
          )}
        </h3>
        {displayAddNewProductForm && (
          <CustomForm
            modelName={"Producto"}
            data={{
              codigo_en_pantalla: firstAvailableCode,
              categoria: PRODUCT_CATEGORIES[0]
            }}
            dataId={null}
            sections={PRODUCT_SECTIONS(fetchAvailableCodes)}
            submitFunction={newProduct}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  const productsApi = new ProductsApi(getJWTFromCtx(ctx), true)
  const paginatedProducts = await productsApi.getProducts()
  const availableCodes = await productsApi.getAvailableCodes(1, 1)
  return {
    props: {
      paginatedProducts: paginatedProducts,
      firstAvailableCode: availableCodes?.available_codes?.[0]
    }
  }
}
