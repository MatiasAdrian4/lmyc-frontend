import { forwardRef, useImperativeHandle, useState } from "react"
import { ExtendedProduct } from "../lmyc_client"
import styles from "../styles/components/Cart.module.css"

type CartProduct = ExtendedProduct & {
  cantidad?: number
  total?: number
}

export const Cart = forwardRef(({}, ref) => {
  const [products, setProducts] = useState([].concat({ total: 0.0 }))

  useImperativeHandle(ref, () => ({
    addProduct(product: CartProduct) {
      if (!products.map((product) => product.codigo).includes(product.codigo)) {
        /* Insert product as penultimate element of the list (total is always the last one) */
        product.cantidad = 0
        product.total = 0
        const totalProduct = products.pop()
        setProducts(products.concat(product).concat(totalProduct))
      }
    }
  }))

  const onChangeQuantity = (productId, quantity) => {
    /* Search product in products array and update his total depending on the selected quantity */
    const productIndex = products
      .map((product) => product.codigo)
      .indexOf(productId)
    products[productIndex].total =
      products[productIndex].precio_venta_contado * quantity

    /* Update total */
    products[products.length - 1].total = products
      .slice(0, products.length - 1)
      .reduce((partialSum, product) => partialSum + product.total, 0)
    setProducts([...products])
  }

  return (
    <>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Detalle</th>
            <th>Precio Contado</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.codigo ? product.codigo : "total"}>
              <td>{product.codigo}</td>
              <td>{product.detalle}</td>
              <td>
                {product.codigo && (
                  <input
                    type="number"
                    defaultValue={product.precio_venta_contado}
                  />
                )}
              </td>
              <td>
                {product.codigo && (
                  <input
                    type="number"
                    onChange={(e) =>
                      onChangeQuantity(product.codigo, +e.target.value)
                    }
                  />
                )}
              </td>
              <td>
                <input
                  type="number"
                  readOnly={true}
                  value={parseFloat(product.total).toFixed(2)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
})
