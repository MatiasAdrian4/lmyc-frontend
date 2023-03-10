import React, { useState, useEffect } from "react"
import styles from "styles/components/SearchPagination.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es"
import { getDayMonthAndYear, getMonthAndYear, getYear } from "utils/utils"

interface SearchPaginationProps {
  /** Number of pages */
  totalRows: number
  /** Number of elements per page */
  rowsPerPage: number
  /** Action to be called when the page change */
  pageChangeHandler: Function
  /** Action to be called when the input text change */
  textChangeHandler: Function
  /** Placeholder for the text input */
  searchInputPlaceholder?: string
  /** Use a datepicker instead a text input */
  useDatePicker?: boolean
  /** Action to be called when the date change */
  dateChangeHandler: Function
  /** Set state action used for reload purposes */
  reloadHandler: Function
}

enum DatepickerType {
  Day = 1,
  Month = 2,
  Year = 3
}

export const SearchPagination: React.FC<SearchPaginationProps> = ({
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
  const [text, setText] = useState(null)
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
    if (text !== null) {
      textChangeHandler(text)
      currentPage == 1 ? reloadHandler(true) : setCurrentPage(1)
    }
  }, [text])

  const getFormattedDate = (date) => {
    if (!date) {
      return null
    }
    switch (datepickerSelected) {
      case DatepickerType.Day: {
        return getDayMonthAndYear(date)
      }
      case DatepickerType.Month: {
        return getMonthAndYear(date)
      }
      case DatepickerType.Year: {
        return getYear(date)
      }
      default: {
        return null
      }
    }
  }

  useEffect(() => {
    if (useDatePicker) {
      dateChangeHandler(getFormattedDate(date))
      currentPage == 1 ? reloadHandler(true) : setCurrentPage(1)
    }
  }, [date])

  useEffect(() => {
    if (useDatePicker) {
      if (date) {
        setDate(null)
      } else {
        dateChangeHandler(getFormattedDate(date))
        currentPage == 1 ? reloadHandler(true) : setCurrentPage(1)
      }
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
