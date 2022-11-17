import { useMemo } from "react"
import { useTable } from "react-table"
import styles from "../../styles/components/BasicTable.module.css"
import { Column } from "./columns"

interface BasicTableProps {
  /** What the table displays */
  title: string
  /** Table's structure */
  columns: Column[]
  /** Data to render in the table */
  data: any[]
}

export const BasicTable: React.FC<BasicTableProps> = ({
  title,
  columns,
  data
}: BasicTableProps) => {
  const tableColumns = useMemo(() => columns, [columns])
  const tableData = useMemo(() => data, [data])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data: tableData, manualPagination: true })

  return (
    <>
      <table className={styles.basicTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <th
                  style={{ width: column.width }}
                  {...column.getHeaderProps()}
                  key={j}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => {
                  return (
                    <td {...cell.getCellProps()} key={j}>
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {tableData.length == 0 && (
        <p className={styles.noElementsText}>
          No se encontraron {title.toLowerCase()}s.
        </p>
      )}
    </>
  )
}
