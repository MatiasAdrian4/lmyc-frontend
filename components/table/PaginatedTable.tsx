import { useEffect, useState } from "react"
import { BasicTable } from "./BasicTable"
import SearchPagination from "./SearchPagination"

const PaginatedTable = ({
  columns,
  rows,
  totalRows,
  rowsPerPage,
  fetchData,
  searchInputPlaceholder
}) => {
  const [pageData, setPageData] = useState({
    rows: rows,
    totalRows: totalRows
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [text, setText] = useState("")
  const [reload, setReload] = useState(false)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) {
      setReload(false)
      fetchData(currentPage, text).then((data) => {
        const { count, results } = data
        setPageData({
          rows: results,
          totalRows: count
        })
      })
    } else {
      /* doing this to avoid useEffect in first render */
      setLoaded(true)
    }
  }, [currentPage, reload])

  return (
    <>
      <SearchPagination
        totalRows={pageData.totalRows}
        rowsPerPage={rowsPerPage}
        pageChangeHandler={setCurrentPage}
        textChangeHandler={setText}
        searchInputPlaceholder={searchInputPlaceholder}
        reloadHandler={setReload}
      />
      <BasicTable columns={columns} data={pageData.rows} />
    </>
  )
}

export default PaginatedTable
