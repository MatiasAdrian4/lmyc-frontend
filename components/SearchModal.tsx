import { forwardRef, useImperativeHandle, useState } from "react"
import Modal from "react-modal"
import { Column } from "./table/columns"
import { PaginatedTable } from "./table/PaginatedTable"

interface SearchModalProps {
  /** Model's name */
  modelName: string
  /** Table's structure */
  columns: Column[]
  /** Function used to fetch new data when input change */
  fetchData: Function
  /** Placeholder for the text input */
  searchInputPlaceholder: string
}

const customStyles = {
  content: {
    width: "80%",
    height: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}

export const SearchModal = forwardRef(
  (
    { modelName, columns, fetchData, searchInputPlaceholder }: SearchModalProps,
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      openModal() {
        setIsOpen(true)
      },

      closeModal() {
        setIsOpen(false)
      }
    }))

    return (
      <>
        <Modal
          ariaHideApp={false}
          isOpen={isOpen}
          style={customStyles}
          onRequestClose={() => setIsOpen(false)}
        >
          <h2>Buscador de {modelName}s</h2>
          <PaginatedTable
            columns={columns}
            rows={[]}
            totalRows={0}
            rowsPerPage={7}
            fetchData={fetchData}
            searchInputPlaceholder={searchInputPlaceholder}
          />
        </Modal>
      </>
    )
  }
)

SearchModal.displayName = "SearchModal"
