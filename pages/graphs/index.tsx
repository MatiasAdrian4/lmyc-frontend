import { GetServerSideProps } from "next"
import {
  getMonthAndYear,
  getYear,
  isUserAuthenticated,
  ssRedirectToLoginPage
} from "../../utils/utils"
import styles from "../../styles/graphs/Graphs.module.css"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es"
import { LineChart } from "../../components/LineChart"
import { MONTHS } from "../../utils/constants"
import { getSalesPerMonth, getSalesPerYear } from "../../api/fetch"

enum SalesDatepickerType {
  Month = 1,
  Year = 2
}

export default function Graphs() {
  const [date, setDate] = useState(null)
  const [datepickerSelected, setDatepickerSelected] = useState(
    SalesDatepickerType.Month
  )
  const [data, setData] = useState(null)
  const [graphLabels, setGraphLabels] = useState(null)

  const onChangeDate = (event) => {
    setDatepickerSelected(+event.target.value)
    setDate(null)
    setGraphLabels([])
  }

  useEffect(() => {
    const fetchData = async (date) => {
      if (date && datepickerSelected == SalesDatepickerType.Month) {
        const formattedDate = getMonthAndYear(date)
        const data = await getSalesPerMonth(
          formattedDate.split("/")[0],
          formattedDate.split("/")[1]
        )
        setData([].concat(data.sales_per_month))
        setGraphLabels(
          Array.from({ length: data.sales_per_month.length }, (_, i) => i + 1)
        )
      } else if (date && datepickerSelected == SalesDatepickerType.Year) {
        const formattedDate = getYear(date)
        const data = await getSalesPerYear(formattedDate)
        setData([].concat(data.sales_per_year))
        setGraphLabels(MONTHS)
      }
    }

    fetchData(date)
  }, [date])

  return (
    <>
      <h3 className={styles.sectionTitle}>Gráfico de Ventas</h3>
      {/*02-2022 (show the 30 o 31 days) o 2020 (show the months)*/}

      <div className={styles.datepickerType} onChange={onChangeDate}>
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
      <div className={styles.graphSection}>
        <LineChart
          labels={graphLabels}
          datasets={[
            {
              label: "Ventas",
              data: data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)"
            }
          ]}
        />
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
