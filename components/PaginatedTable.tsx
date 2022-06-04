import { useEffect, useState } from "react"
import { BasicTable } from "./BasicTable"
import Pagination from "./Pagination"

const PaginatedTable = ({
  columns,
  rows,
  totalRows,
  rowsPerPage,
  fetchData
}) => {
  const [pageData, setPageData] = useState({
    rows: rows,
    totalRows: totalRows
  })

  const [currentPage, setCurrentPage] = useState(1)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) {
      fetchData(currentPage).then((data) => {
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
  }, [currentPage])

  return (
    <div>
      <Pagination
        totalRows={pageData.totalRows}
        rowsPerPage={rowsPerPage}
        pageChangeHandler={setCurrentPage}
      />
      <div>
        <BasicTable columns={columns} data={pageData.rows} />
      </div>
    </div>
  )
}

export default PaginatedTable
