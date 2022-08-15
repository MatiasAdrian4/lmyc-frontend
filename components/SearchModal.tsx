import { useEffect, useState } from "react"
import Modal from "react-modal"
import { Column } from "../utils/columns"
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
  /** Variable used to close the modal */
  forceCloseModal?: boolean
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

const SearchModal: React.FC<SearchModalProps> = ({
  modelName,
  columns,
  fetchData,
  searchInputPlaceholder,
  forceCloseModal
}: SearchModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    if (forceCloseModal && isOpen) {
      closeModal()
    }
  }, [forceCloseModal])

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
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

export default SearchModal
