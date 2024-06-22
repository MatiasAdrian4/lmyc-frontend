import { GetServerSideProps } from "next"
import {
  isUserAuthenticated,
  ssRedirectToLoginPage,
  toFixed2
} from "utils/utils"
import styles from "styles/account-summaries/AccountSummaries.module.css"
import { useRef, useState } from "react"
import { Client } from "lmyc_client"
import { SearchModal } from "components/SearchModal"
import {
  ACCOUNT_SUMMARY_ITEMS_COLUMNS,
  SEARCH_CLIENT_COLUMNS
} from "components/table/columns"
import { getClients } from "api/fetch"
import { Models } from "utils/constants"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es"
import { BasicTable } from "components/table/BasicTable"

interface ModalRef {
  closeModal: () => void
}

enum ItemType {
  Debe = 1,
  Haber = 2
}

export default function AccountSummariesList({}) {
  const clientModalRef = useRef<ModalRef | null>(null)

  const [client, setClient] = useState<Client | null>(null)
  const [
    displayAddNewAccountSummaryItemForm,
    setDisplayAddNewAccountSummaryItemForm
  ] = useState(false)

  // new account summary item
  const [newItemDate, setNewItemDate] = useState(new Date())
  const [newItemType, setNewItemType] = useState(ItemType.Debe)
  const [newItemDescription, setNewItemDescription] = useState("")
  const [newItemAmount, setNewItemAmount] = useState(0)

  const [accountSummaryItems, setAccountSummaryItems] = useState([])

  const createNewItem = () => {
    console.log("date: ", newItemDate)
    console.log("type: ", newItemType)
    console.log("description: ", newItemDescription)
    console.log("amount: ", newItemAmount)
  }

  const openModal = (modalRef) => {
    modalRef.current.openModal()
  }

  const selectClient = (client: Client) => {
    setClient(client)
    clientModalRef.current!.closeModal()
  }

  return (
    <>
      <div id="account-summaries">
        <div className={styles.clientSearchSection}>
          <button onClick={() => openModal(clientModalRef)}>
            Buscar Cliente
          </button>
          <input
            data-cy="client-selected"
            readOnly={true}
            type="text"
            value={client ? client.nombre : ""}
          />
        </div>

        <SearchModal
          ref={clientModalRef}
          modelName={Models.Client}
          columns={SEARCH_CLIENT_COLUMNS(selectClient)}
          fetchData={getClients}
          searchInputPlaceholder={"Buscar por Cód. o Nombre."}
        />
      </div>

      <div className={styles.newAccountSummarySection}>
        <h3
          data-cy="open-new-account-summary-item-form"
          onClick={() =>
            setDisplayAddNewAccountSummaryItemForm(
              !displayAddNewAccountSummaryItemForm
            )
          }
        >
          Agregar Nuevo Item
          {!displayAddNewAccountSummaryItemForm ? (
            <span className={styles.triangle}>△</span>
          ) : (
            <span className={styles.triangle}>▽</span>
          )}
        </h3>
        {displayAddNewAccountSummaryItemForm && (
          <div className={styles.newItemForm}>
            <div className={styles.formField}>
              <span>Fecha</span>
              <div className={styles.datepicker}>
                <DatePicker
                  locale={es}
                  dateFormat="dd/MM/yyyy"
                  selected={newItemDate}
                  onChange={(date) => setNewItemDate(date)}
                />
              </div>
            </div>
            <div className={styles.formField}>
              <label>
                <input
                  type="radio"
                  name="itemType"
                  checked={newItemType === ItemType.Debe}
                  onChange={() => setNewItemType(ItemType.Debe)}
                />
                Debe
              </label>
              <label>
                <input
                  type="radio"
                  name="itemType"
                  checked={newItemType === ItemType.Haber}
                  onChange={() => setNewItemType(ItemType.Haber)}
                />
                Haber
              </label>
            </div>
            <div className={styles.formField}>
              <span>Descripción</span>
              <input
                type="text"
                onChange={(e) => setNewItemDescription(e.target.value)}
              ></input>
            </div>
            <div className={styles.formField}>
              <span>Importe</span>
              <input
                type="number"
                onChange={(e) => setNewItemAmount(toFixed2(+e.target.value))}
              ></input>
            </div>
            <div className={styles.formField}>
              <button type="button" onClick={createNewItem}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.accountSummarySection}>
        <h3>Resumenes de cuenta de: {client?.nombre}</h3>
        <div className={styles.accountSummaryTable}>
          <BasicTable
            title="Item"
            columns={ACCOUNT_SUMMARY_ITEMS_COLUMNS}
            data={accountSummaryItems}
          />
        </div>
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
