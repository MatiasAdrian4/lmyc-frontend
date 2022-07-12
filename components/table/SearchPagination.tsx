import React, { useState, useEffect } from "react"
import styles from "../../styles/components/SearchPagination.module.css"

interface SearchPaginationProps {
  totalRows: number
  rowsPerPage: number
  pageChangeHandler: Function
  textChangeHandler: Function
  searchInputPlaceholder?: string
  useDatePicker?: boolean
  reloadHandler: Function
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  totalRows,
  rowsPerPage,
  pageChangeHandler,
  textChangeHandler,
  searchInputPlaceholder,
  useDatePicker = false,
  reloadHandler
}: SearchPaginationProps) => {
  const numberOfPages = Math.ceil(totalRows / rowsPerPage)

  const [currentPage, setCurrentPage] = useState(1)
  const [text, setText] = useState("")

  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoNext, setCanGoNext] = useState(true)

  const onNextPage = () => setCurrentPage(currentPage + 1)
  const onPrevPage = () => setCurrentPage(currentPage - 1)

  useEffect(() => {
    if (numberOfPages === currentPage) {
      setCanGoNext(false)
    } else {
      numberOfPages > currentPage ? setCanGoNext(true) : setCanGoNext(false)
    }
    currentPage === 1 ? setCanGoBack(false) : setCanGoBack(true)
  }, [numberOfPages, currentPage])

  useEffect(() => {
    pageChangeHandler(currentPage)
  }, [currentPage])

  useEffect(() => {
    textChangeHandler(text)
    currentPage == 1 ? reloadHandler(true) : setCurrentPage(1)
  }, [text])

  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.paginationBar}>
          {!useDatePicker && (
            <input
              type="text"
              placeholder={searchInputPlaceholder}
              onChange={(e) => setText(e.target.value)}
            />
          )}
          <span>
            Página{" "}
            <strong>
              {numberOfPages > 0 ? currentPage : "-"} de {numberOfPages}
            </strong>{" "}
          </span>
          <button onClick={onPrevPage} disabled={!canGoBack}>
            {"<"}
          </button>
          <button onClick={onNextPage} disabled={!canGoNext}>
            {">"}
          </button>
        </div>
      </div>
    </>
  )
}

export default SearchPagination
