import { forwardRef, useImperativeHandle, useState } from "react"
import Modal from "react-modal"
import { Column } from "./table/columns"
import PaginatedTable from "./table/PaginatedTable"

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

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    useImperativeHandle(ref, () => ({
      closeModal() {
        setIsOpen(false)
      }
    }))

    return (
      <>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          ariaHideApp={false}
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
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
