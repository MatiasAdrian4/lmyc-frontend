import PaginatedTable from "../../components/table/PaginatedTable"
import { SALES_HISTORY_COLUMNS } from "../../utils/columns"
import { ROWS_PER_PAGE } from "../../utils/constants"
import { SalesApi } from "../../api/lmycApi"

export const getSales = async (pageNumber: number, date: string) => {
  if (!date) {
    return { count: 0, next: null, previous: null, results: [] }
  }

  const salesApi = new SalesApi()
  const splitDate = date.split("/")
  switch (splitDate.length) {
    case 3: {
      return await salesApi.getSales(pageNumber, splitDate[0], splitDate[1], splitDate[2])
    }
    case 2: {
      return await salesApi.getSales(pageNumber, '', splitDate[0], splitDate[1])
    }
    case 1: {
      return await salesApi.getSales(pageNumber, '', '', splitDate[0])
    }
    default: {
      return { count: 0, next: null, previous: null, results: [] }
    }
  }
}

export default function SalesList() {
  return (
    <>
      <PaginatedTable
        columns={SALES_HISTORY_COLUMNS}
        rows={[]}
        totalRows={0}
        rowsPerPage={ROWS_PER_PAGE}
        fetchData={getSales}
        useDatePicker={true}
      />
    </>
  )
}
