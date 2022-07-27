import Link from "next/link"
import { downloadInvoicePDF, formatDate } from "./utils"

export interface Column {
  Header: string
  accessor: string
  width: string
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
    width: "5%"
  },
  {
    Header: "Telefono",
    accessor: "telefono",
    width: "15%"
  },
  {
    Header: "Cuit",
    accessor: "cuit",
    width: "15%"
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
    width: "10%"
  },
  {
    Header: "Detalle",
    accessor: "detalle",
    width: "30%"
  },
  {
    Header: "Stock",
    accessor: "stock",
    width: "10%"
  },
  {
    Header: "Precio Costo",
    accessor: "precio_costo",
    width: "10%"
  },
  {
    Header: "Precio Venta Contado",
    accessor: "precio_venta_contado",
    width: "10%"
  },
  {
    Header: "Precio Venta Cta. Cte.",
    accessor: "precio_venta_cta_cte",
    width: "10%"
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
        {value.split(";").map((v, i) => (
          <li key={i}>{v}</li>
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
    width: "25%"
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
    width: "45%",
    Cell: ({ value }) => (
      <ul>
        {value.split(";").map((v, i) => (
          <li key={i}>{v}</li>
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
    width: "15%"
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
