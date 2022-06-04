import React, { useState, useEffect } from "react"
import styles from "../styles/Pagination.module.css"

const Pagination = ({ totalRows, rowsPerPage, pageChangeHandler }) => {
  const numberOfPages = Math.ceil(totalRows / rowsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoNext, setCanGoNext] = useState(true)

  const onNextPage = () => setCurrentPage(currentPage + 1)
  const onPrevPage = () => setCurrentPage(currentPage - 1)
  //const onPageSelect = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    if (numberOfPages === currentPage) {
      setCanGoNext(false)
    } else {
      setCanGoNext(true)
    }
    if (currentPage === 1) {
      setCanGoBack(false)
    } else {
      setCanGoBack(true)
    }
  }, [numberOfPages, currentPage])

  useEffect(() => {
    pageChangeHandler(currentPage)
  }, [currentPage])

  return (
    <>
      <div className={styles.pagination}>
        <span>
          Página{" "}
          <strong>
            {currentPage} de {numberOfPages}
          </strong>{" "}
        </span>
        <button
          onClick={onPrevPage}
          disabled={!canGoBack}
          className={styles.paginationButton}
        >
          {"<"}
        </button>
        <button
          onClick={onNextPage}
          disabled={!canGoNext}
          className={styles.paginationButton}
        >
          {">"}
        </button>
      </div>
    </>
  )
}

export default Pagination
