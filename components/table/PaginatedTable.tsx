import { useEffect, useState } from "react"
import { Column } from "./columns"
import { BasicTable } from "./BasicTable"
import { SearchPagination } from "./SearchPagination"

interface PaginatedTableProps {
  /** What the table displays */
  title: string
  /** Table's structure */
  columns: Column[]
  /** Data to render in the table */
  rows: any[]
  /** Number of pages */
  totalRows: number
  /** Number of elements per page */
  rowsPerPage: number
  /** Function used to fetch new data when input change */
  fetchData: Function
  /** Placeholder for the text input */
  searchInputPlaceholder?: string
  /** Use a datepicker instead a text input */
  useDatePicker?: boolean
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  title,
  columns,
  rows,
  totalRows,
  rowsPerPage,
  fetchData,
  searchInputPlaceholder,
  useDatePicker = false
}: PaginatedTableProps) => {
  const [pageData, setPageData] = useState({
    rows: rows,
    totalRows: totalRows
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [text, setText] = useState("")
  const [reload, setReload] = useState(false)

  const [loaded, setLoaded] = useState(false)

  const fetchDataAndUpdateTable = () => {
    fetchData(currentPage, rowsPerPage, text).then((data) => {
      const { count, results } = data
      setPageData({
        rows: results,
        totalRows: count
      })
    })
  }

  useEffect(() => {
    loaded ? fetchDataAndUpdateTable() : setLoaded(true)
  }, [currentPage])

  useEffect(() => {
    if (reload) {
      fetchDataAndUpdateTable()
      setReload(false)
    }
  }, [reload])

  return (
    <>
      <SearchPagination
        totalRows={pageData.totalRows}
        rowsPerPage={rowsPerPage}
        pageChangeHandler={setCurrentPage}
        textChangeHandler={setText}
        searchInputPlaceholder={searchInputPlaceholder}
        useDatePicker={useDatePicker}
        dateChangeHandler={setText}
        reloadHandler={setReload}
      />
      <br></br>
      <BasicTable title={title} columns={columns} data={pageData.rows} />
    </>
  )
}
