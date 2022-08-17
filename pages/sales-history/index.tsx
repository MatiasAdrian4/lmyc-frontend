import { PaginatedTable } from "../../components/table/PaginatedTable"
import { SALES_HISTORY_COLUMNS } from "../../components/table/columns"
import { ROWS_PER_PAGE } from "../../utils/constants"
import { getSales } from "../../api/fetch"

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
