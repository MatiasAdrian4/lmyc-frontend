import { useEffect, useState } from "react"
import { Column } from "../../utils/columns"
import { BasicTable } from "./BasicTable"
import SearchPagination from "./SearchPagination"

interface PaginatedTableProps {
  columns: Column[]
  rows: any[]
  totalRows: number
  rowsPerPage: number
  fetchData: Function
  withInputSearch?: boolean
  searchInputPlaceholder?: string
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  columns,
  rows,
  totalRows,
  rowsPerPage,
  fetchData,
  withInputSearch = true,
  searchInputPlaceholder
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
    fetchData(currentPage, text).then((data) => {
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
        withInputSearch={withInputSearch}
        searchInputPlaceholder={searchInputPlaceholder}
        reloadHandler={setReload}
      />
      <BasicTable columns={columns} data={pageData.rows} />
    </>
  )
}

export default PaginatedTable
