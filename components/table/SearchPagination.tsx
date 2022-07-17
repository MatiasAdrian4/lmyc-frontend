import React, { useState, useEffect } from "react"
import styles from "../../styles/components/SearchPagination.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es"

interface SearchPaginationProps {
  totalRows: number
  rowsPerPage: number
  pageChangeHandler: Function
  textChangeHandler: Function
  searchInputPlaceholder?: string
  useDatePicker?: boolean
  dateChangeHandler: Function
  reloadHandler: Function
}

enum DatepickerType {
  Day = 1,
  Month = 2,
  Year = 3
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  totalRows,
  rowsPerPage,
  pageChangeHandler,
  textChangeHandler,
  searchInputPlaceholder,
  useDatePicker = false,
  dateChangeHandler,
  reloadHandler
}: SearchPaginationProps) => {
  const numberOfPages = Math.ceil(totalRows / rowsPerPage)

  const [currentPage, setCurrentPage] = useState(1)
  const [text, setText] = useState("")
  const [date, setDate] = useState(null)
  const [datepickerSelected, setDatepickerSelected] = useState(
    DatepickerType.Day
  )

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

  const getFormattedDate = () => {
    if (!date) {
      return null
    }
    switch (datepickerSelected) {
      case DatepickerType.Day: {
        return `${date.getUTCDate()}/${
          date.getUTCMonth() + 1
        }/${date.getUTCFullYear()}`
      }
      case DatepickerType.Month: {
        return `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
      }
      case DatepickerType.Year: {
        return `${date.getUTCFullYear()}`
      }
      default: {
        return null
      }
    }
  }

  useEffect(() => {
    dateChangeHandler(getFormattedDate())
    currentPage == 1 ? reloadHandler(true) : setCurrentPage(1)
  }, [date])

  useEffect(() => {
    if (date) {
      setDate(null)
    } else {
      dateChangeHandler(getFormattedDate())
      currentPage == 1 ? reloadHandler(true) : setCurrentPage(1)
    }
  }, [datepickerSelected])

  const onChangeDate = (event) => {
    setDatepickerSelected(+event.target.value)
  }

  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.paginationBar}>
          {!useDatePicker && (
            <input
              className={styles.searchInput}
              type="text"
              placeholder={searchInputPlaceholder}
              onChange={(e) => setText(e.target.value)}
            />
          )}
          {useDatePicker && (
            <>
              <div className={styles.datepickerType} onChange={onChangeDate}>
                <input
                  type="radio"
                  value={DatepickerType.Day}
                  name="date"
                  defaultChecked
                />{" "}
                Dia/Mes/Año
                <input
                  type="radio"
                  value={DatepickerType.Month}
                  name="date"
                />{" "}
                Mes/Año
                <input
                  type="radio"
                  value={DatepickerType.Year}
                  name="date"
                />{" "}
                Año
              </div>
              <div className={styles.datepicker}>
                {datepickerSelected == DatepickerType.Day && (
                  <DatePicker
                    locale={es}
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                  />
                )}
                {datepickerSelected == DatepickerType.Month && (
                  <DatePicker
                    locale={es}
                    dateFormat="MM/yyyy"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    showMonthYearPicker
                    showFullMonthYearPicker
                  />
                )}
                {datepickerSelected == DatepickerType.Year && (
                  <DatePicker
                    locale={es}
                    dateFormat="yyyy"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    showYearPicker
                  />
                )}
              </div>
            </>
          )}
          <span className={styles.currentPageInfo}>
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
