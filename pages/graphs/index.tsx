import { GetServerSideProps } from "next"
import {
  getMonthAndYear,
  getYear,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "utils/utils"
import styles from "styles/graphs/Graphs.module.css"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es"
import { DatasetProps, LineChart } from "components/LineChart"
import { MONTHS } from "utils/constants"
import { getSalesPerMonth, getSalesPerYear } from "api/fetch"

enum SalesDatepickerType {
  Month = 1,
  Year = 2
}

export default function Graphs() {
  const [datepickerSelected, setDatepickerSelected] = useState(
    SalesDatepickerType.Month
  )

  const [date, setDate] = useState(null)
  const [compareDate, setCompareDate] = useState(null)

  const [dataset, setDataset] = useState(null)
  const [compareDataset, setCompareDataset] = useState(null)

  const [incremental, setIncremental] = useState(false)
  const [compare, setCompare] = useState(false)

  const onChangeDateType = (event) => {
    setDatepickerSelected(+event.target.value)
    setDate(null)
    setCompareDate(null)
  }

  const getFormattedDate = (date) => {
    if (!date) {
      return null
    }
    switch (datepickerSelected) {
      case SalesDatepickerType.Month: {
        return getMonthAndYear(date)
      }
      case SalesDatepickerType.Year: {
        return getYear(date)
      }
      default: {
        return null
      }
    }
  }

  const getDataInIncrementalFormat = (datasetSelected) => {
    const incrementalDataset = []
    datasetSelected.reduce((a, b, i) => (incrementalDataset[i] = a + b), 0)
    return incrementalDataset
  }

  const fetchDataset = async (dateSelected, setDatasetSelected) => {
    if (dateSelected && datepickerSelected == SalesDatepickerType.Month) {
      const data = await getSalesPerMonth(
        getFormattedDate(dateSelected).split("/")[0],
        getFormattedDate(dateSelected).split("/")[1]
      )
      setDatasetSelected([].concat(data.sales_per_month))
    } else if (dateSelected && datepickerSelected == SalesDatepickerType.Year) {
      const data = await getSalesPerYear(getFormattedDate(dateSelected))
      setDatasetSelected([].concat(data.sales_per_year))
    }
  }

  useEffect(() => {
    fetchDataset(date, setDataset)
  }, [date])

  useEffect(() => {
    fetchDataset(compareDate, setCompareDataset)
  }, [compareDate])

  useEffect(() => {
    if (!compare) {
      setCompareDate(null)
    }
  }, [compare])

  const getDatasets = (): DatasetProps[] => {
    const datasets = []
    if (date && dataset) {
      datasets.push({
        label: `Ventas ${getFormattedDate(date)}`,
        data: incremental ? getDataInIncrementalFormat(dataset) : dataset,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      })
      if (compareDate && compareDataset) {
        datasets.push({
          label: `Ventas ${getFormattedDate(compareDate)}`,
          data: incremental
            ? getDataInIncrementalFormat(compareDataset)
            : compareDataset,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)"
        })
      }
    }
    return datasets
  }

  const getGraphLabels = (): string[] => {
    if (!date || !dataset) {
      return []
    }
    if (datepickerSelected == SalesDatepickerType.Month) {
      const length =
        compareDate && compareDataset && compareDataset.length > dataset.length
          ? compareDataset.length
          : dataset.length
      return Array.from({ length: length }, (_, i) => (i + 1).toString())
    }
    if (datepickerSelected == SalesDatepickerType.Year) {
      return MONTHS
    }
    return []
  }

  return (
    <>
      <h3 className={styles.sectionTitle}>Gráfico de Ventas</h3>
      <div className={styles.datepickerType} onChange={onChangeDateType}>
        <input
          type="radio"
          value={SalesDatepickerType.Month}
          name="date"
          defaultChecked
        />{" "}
        Mes/Año
        <input type="radio" value={SalesDatepickerType.Year} name="date" /> Año
      </div>
      <div className={styles.datepicker}>
        {datepickerSelected == SalesDatepickerType.Month && (
          <DatePicker
            locale={es}
            dateFormat="MM/yyyy"
            selected={date}
            onChange={(date) => setDate(date)}
            showMonthYearPicker
            showFullMonthYearPicker
          />
        )}
        {datepickerSelected == SalesDatepickerType.Year && (
          <DatePicker
            locale={es}
            dateFormat="yyyy"
            selected={date}
            onChange={(date) => setDate(date)}
            showYearPicker
          />
        )}
      </div>
      <div className={styles.incrementalCheck}>
        <input
          type="checkbox"
          checked={incremental}
          onChange={(e) => setIncremental(e.target.checked)}
        />{" "}
        Incremental
        <input
          type="checkbox"
          checked={compare}
          onChange={(e) => setCompare(e.target.checked)}
        />{" "}
        Comparar con otro periodo
      </div>
      {compare && (
        <>
          <div className={styles.datepicker}>
            {datepickerSelected == SalesDatepickerType.Month && (
              <DatePicker
                locale={es}
                dateFormat="MM/yyyy"
                selected={compareDate}
                onChange={(compareDate) => setCompareDate(compareDate)}
                showMonthYearPicker
                showFullMonthYearPicker
              />
            )}
            {datepickerSelected == SalesDatepickerType.Year && (
              <DatePicker
                locale={es}
                dateFormat="yyyy"
                selected={compareDate}
                onChange={(compareDate) => setCompareDate(compareDate)}
                showYearPicker
              />
            )}
          </div>
        </>
      )}
      <div className={styles.graphSection}>
        <LineChart labels={getGraphLabels()} datasets={getDatasets()} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  return {
    props: {}
  }
}
