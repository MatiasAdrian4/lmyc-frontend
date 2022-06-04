import React, { useState, useEffect } from "react"
import styles from "../styles/components/SearchPagination.module.css"

const SearchPagination = ({
  totalRows,
  rowsPerPage,
  pageChangeHandler,
  textChangeHandler,
  searchInputPlaceholder,
  reloadHandler
}) => {
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
      console.log(numberOfPages, currentPage)
      if (numberOfPages > currentPage) {
        setCanGoNext(true)
      } else {
        setCanGoNext(false)
      }
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

  useEffect(() => {
    textChangeHandler(text)
    currentPage == 1 ? reloadHandler(true) : setCurrentPage(1)
  }, [text])

  return (
    <>
      <div className={styles.pagination}>
        <input
          type="text"
          placeholder={searchInputPlaceholder}
          onChange={(e) => setText(e.target.value)}
        />
        <span>
          Página{" "}
          <strong>
            {numberOfPages > 0 ? currentPage : '-'} de {numberOfPages}
          </strong>{" "}
        </span>
        <button onClick={onPrevPage} disabled={!canGoBack}>
          {"<"}
        </button>
        <button onClick={onNextPage} disabled={!canGoNext}>
          {">"}
        </button>
      </div>
    </>
  )
}

export default SearchPagination
