import Link from "next/link"
import {
  downloadInvoicePDF,
  formatDate,
  parseInvoiceItem
} from "utils/utils"

export interface Column {
  /** Column's header */
  Header: string
  /** Model's field where the data is read from */
  accessor: string
  /** Field's width (in %) */
  width: string
  /* Cell's format */
  Cell?: Function
}

export const CLIENT_COLUMNS: Column[] = [
  {
    Header: "Id",
    accessor: "id",
    width: "5%"
  },
  {
    Header: "Nombre",
    accessor: "nombre",
    width: "20%"
  },
  {
    Header: "Localidad",
    accessor: "localidad",
    width: "15%"
  },
  {
    Header: "Código Postal",
    accessor: "codigo_postal",
    width: "10%"
  },
  {
    Header: "Telefono",
    accessor: "telefono",
    width: "15%"
  },
  {
    Header: "Cuit",
    accessor: "cuit",
    width: "10%"
  },
  {
    Header: "Email",
    accessor: "email",
    width: "15%"
  },
  {
    Header: "",
    accessor: "ir_a",
    width: "10%",
    Cell: ({ row }) => (
      <Link href={`/clients/${row.original.id}`}>
        <a>Abrir Cliente</a>
      </Link>
    )
  }
]

export const PRODUCT_COLUMNS: Column[] = [
  {
    Header: "Código",
    accessor: "codigo_en_pantalla",
    width: "5%"
  },
  {
    Header: "Detalle",
    accessor: "detalle",
    width: "30%"
  },
  {
    Header: "Stock",
    accessor: "stock",
    width: "5%"
  },
  {
    Header: "Precio Costo",
    accessor: "precio_costo",
    width: "10%",
    Cell: ({ value }) => {
      return value.toFixed(2)
    }
  },
  {
    Header: "Precio Venta Contado",
    accessor: "precio_venta_contado",
    width: "15%",
    Cell: ({ value }) => {
      return value.toFixed(2)
    }
  },
  {
    Header: "Precio Venta Cta. Cte.",
    accessor: "precio_venta_cta_cte",
    width: "15%",
    Cell: ({ value }) => {
      return value.toFixed(2)
    }
  },
  {
    Header: "Categoría",
    accessor: "categoria",
    width: "10%"
  },
  {
    Header: "",
    accessor: "ir_a",
    width: "10%",
    Cell: ({ row }) => (
      <Link href={`/products/${row.original.codigo}`}>
        <a>Abrir Producto</a>
      </Link>
    )
  }
]

export const PRODUCT_HISTORY_PRICES_COLUMNS: Column[] = [
  {
    Header: "Fecha de Actualización",
    accessor: "date",
    width: "33%",
    Cell: ({ value }) => {
      return formatDate(value)
    }
  },
  {
    Header: "De",
    accessor: "old_price",
    width: "33%",
    Cell: ({ value }) => {
      return value.toFixed(2)
    }
  },
  {
    Header: "A",
    accessor: "new_price",
    width: "33%",
    Cell: ({ value }) => {
      return value.toFixed(2)
    }
  }
]

/* TODO:
  - This is the same array as the one used in Invoice table but excluding the Client's name column.
  - Refactor in a way we avoid repeated code.
*/
export const CLIENT_INVOICE_COLUMNS: Column[] = [
  {
    Header: "Código",
    accessor: "codigo",
    width: "10%"
  },
  {
    Header: "Fecha",
    accessor: "fecha",
    width: "15%",
    Cell: ({ value }) => {
      return formatDate(value)
    }
  },
  {
    Header: "Resumen",
    accessor: "resumen_elementos",
    width: "50%",
    Cell: ({ value }) => (
      <ul>
        {value.map((e) => (
          <li key={e.codigo}>{parseInvoiceItem(e)}</li>
        ))}
      </ul>
    )
  },
  {
    Header: "Pago",
    accessor: "esta_pago",
    width: "10%",
    Cell: ({ value }) => {
      if (value) {
        return (
          <span style={{ color: "green", fontSize: "160%" }}>&#10003;</span>
        )
      } else {
        return <span style={{ color: "red", fontSize: "160%" }}>&#10007;</span>
      }
    }
  },
  {
    Header: "",
    accessor: "ir_a",
    width: "15%",
    Cell: ({ row }) => (
      <a onClick={() => downloadInvoicePDF(row.original.codigo)}>
        Descargar PDF
      </a>
    )
  }
]

export const INVOICE_COLUMNS: Column[] = [
  {
    Header: "Código",
    accessor: "codigo",
    width: "5%"
  },
  {
    Header: "Cliente",
    accessor: "cliente",
    width: "20%"
  },
  {
    Header: "Fecha",
    accessor: "fecha",
    width: "10%",
    Cell: ({ value }) => {
      return formatDate(value)
    }
  },
  {
    Header: "Resumen",
    accessor: "resumen_elementos",
    width: "40%",
    Cell: ({ value }) => (
      <ul>
        {value.map((e) => (
          <li key={e.codigo}>{parseInvoiceItem(e)}</li>
        ))}
      </ul>
    )
  },
  {
    Header: "Pago",
    accessor: "esta_pago",
    width: "5%",
    Cell: ({ value }) => {
      if (value) {
        return (
          <span style={{ color: "green", fontSize: "160%" }}>&#10003;</span>
        )
      } else {
        return <span style={{ color: "red", fontSize: "160%" }}>&#10007;</span>
      }
    }
  },
  {
    Header: "",
    accessor: "ir_a",
    width: "10%",
    Cell: ({ row }) => (
      <Link href={`/invoices/${row.original.codigo}`}>
        <a>Abrir Remito</a>
      </Link>
    )
  },
  {
    Header: "",
    accessor: "download",
    width: "10%",
    Cell: ({ row }) => (
      <a onClick={() => downloadInvoicePDF(row.original.codigo)}>
        Descargar PDF
      </a>
    )
  }
]

export const SALES_HISTORY_COLUMNS: Column[] = [
  {
    Header: "Producto",
    accessor: "producto.detalle",
    width: "55%"
  },
  {
    Header: "Cantidad",
    accessor: "cantidad",
    width: "15%"
  },
  {
    Header: "Precio",
    accessor: "precio",
    width: "15%",
    Cell: ({ value }) => {
      return value.toFixed(2)
    }
  },
  {
    Header: "Fecha",
    accessor: "fecha",
    width: "15%",
    Cell: ({ value }) => {
      return formatDate(value)
    }
  }
]

export const SEARCH_PRODUCTS_COLUMNS = (selectFunction: Function): Column[] => [
  {
    Header: "Código",
    accessor: "codigo_en_pantalla",
    width: "20%"
  },
  {
    Header: "Detalle",
    accessor: "detalle",
    width: "60%"
  },
  {
    Header: "Seleccionar",
    accessor: "seleccionar",
    width: "20%",
    Cell: ({ row }) => (
      <button onClick={() => selectFunction(row.original)}>Seleccionar</button>
    )
  }
]

export const SEARCH_CLIENT_COLUMNS = (selectFunction: Function): Column[] => [
  {
    Header: "Id",
    accessor: "id",
    width: "20%"
  },
  {
    Header: "Nombre",
    accessor: "nombre",
    width: "60%"
  },
  {
    Header: "Seleccionar",
    accessor: "seleccionar",
    width: "20%",
    Cell: ({ row }) => (
      <button onClick={() => selectFunction(row.original)}>Seleccionar</button>
    )
  }
]

export const UPDATE_PRODUCT_PRICES_COLUMNS = (
  setSelected: Function
): Column[] => [
  {
    Header: "Código",
    accessor: "codigo",
    width: "10%"
  },
  {
    Header: "Detalle",
    accessor: "detalle",
    width: "70%"
  },
  {
    Header: "Precio Costo",
    accessor: "precio_costo",
    width: "10%"
  },
  {
    Header: "",
    accessor: "selected",
    width: "10%",
    Cell: ({ row }) => (
      <input
        type="checkbox"
        defaultChecked={row.original.selected}
        onChange={(e) => {
          setSelected(row.original.codigo, e.target.checked)
        }}
      />
    )
  }
]
