import { format } from "date-fns"
import { downloadInvoicePDF } from "../../utils"

export const COLUMNS = [
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
      return format(new Date(value), "dd/MM/yyyy")
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
    Cell: ({ row }) => <a onClick={() => downloadInvoicePDF(row.original.codigo)}>Descargar PDF</a>
  }
]
