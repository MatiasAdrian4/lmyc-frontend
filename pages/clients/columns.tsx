import Link from "next/link"

export const COLUMNS = [
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
      <Link href={`/clientes/${row.original.id}`}>
        <a>Abrir Cliente</a>
      </Link>
    )
  }
]
