import { GetServerSideProps } from "next"
import {
  actionPopup,
  errorPopup,
  formatDate,
  isUserAuthenticated,
  ssRedirectToLoginPage,
  successPopup,
  toFixed2
} from "utils/utils"
import styles from "styles/account-summaries/AccountSummaries.module.css"
import { useEffect, useRef, useState } from "react"
import { AccountSummaryItem, Client } from "lmyc_client"
import { SearchModal } from "components/SearchModal"
import {
  ACCOUNT_SUMMARY_ITEMS_COLUMNS,
  SEARCH_CLIENT_COLUMNS
} from "components/table/columns"
import {
  deleteAccountSummaryItem,
  getAccountSummaryItems,
  getClients,
  newAccountSummaryItem
} from "api/fetch"
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

type Item = {
  id?: number
  description?: string
  date?: string
  debe?: number
  haber?: number
  total: number
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

  // search
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  )
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), 11, 31)
  )

  const [accountSummaryItems, setAccountSummaryItems] = useState<Item[]>([
    { total: 0.0 }
  ])

  const fetchAccountSummaryItems = async (clientId: number) => {
    const items = await getAccountSummaryItems(
      clientId,
      formatDate(startDate, "yyyy-MM-dd"),
      formatDate(endDate, "yyyy-MM-dd")
    )

    let newItems: Item[] = []
    let total: number = 0.0

    for (const item of items) {
      if (item.type === "debe") {
        total += item.amount!
      } else {
        // item.type === "haber"
        total -= item.amount!
      }

      newItems.push({
        id: item.id,
        description: item.description,
        date: item.date,
        debe: item.type === "debe" ? item.amount : undefined,
        haber: item.type === "haber" ? item.amount : undefined,
        total: total
      })
    }

    newItems.push({ total: total })

    setAccountSummaryItems(newItems)
  }

  const createNewItem = async () => {
    try {
      await newAccountSummaryItem({
        client: client?.id,
        date: newItemDate.toISOString().split("T")[0],
        description: newItemDescription,
        type: newItemType == ItemType.Debe ? "debe" : "haber",
        amount: newItemAmount
      })
      successPopup("Item creado satisfactoriamente.")

      fetchAccountSummaryItems(client?.id!)
    } catch {
      errorPopup("Ha ocurrido un error al intentar crear el item.")
    }
  }

  const openModal = (modalRef) => {
    modalRef.current.openModal()
  }

  const selectClient = (client: Client) => {
    setClient(client)
    clientModalRef.current!.closeModal()
  }

  const saveButtonDisabled = () => {
    return newItemDescription == "" || newItemAmount == 0
  }

  useEffect(() => {
    if (client) {
      fetchAccountSummaryItems(client.id!)
    }
  }, [client, startDate, endDate])

  const deleteItem = async (itemId: number) => {
    try {
      await deleteAccountSummaryItem(itemId)
    } catch {
      errorPopup("Ha occurido un error al intentar eliminar el item.")
    }
    fetchAccountSummaryItems(client?.id!)
  }

  const confirmDeleteAccountSummaryItem = (item: AccountSummaryItem) => {
    actionPopup(
      "¿Esta seguro de querer eliminar este item?",
      "Eliminar",
      () => deleteItem(item.id!),
      true
    )
  }

  const downloadAccountSummaryPDF = () => {
    console.log("hey!")
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

      {client && (
        <>
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
                    onChange={(e) =>
                      setNewItemAmount(toFixed2(+e.target.value))
                    }
                  ></input>
                </div>
                <div className={styles.formField}>
                  <button
                    type="button"
                    onClick={createNewItem}
                    disabled={saveButtonDisabled()}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.accountSummarySection}>
            <div className={styles.menuControls}>
              <div className={styles.datepicker}>
                <div className={styles.datepickerField}>
                  <span>Desde</span>
                  <DatePicker
                    locale={es}
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className={styles.datepicker}>
                <div className={styles.datepickerField}>
                  <span>Hasta</span>
                  <DatePicker
                    locale={es}
                    dateFormat="dd/MM/yyyy"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
              <button onClick={downloadAccountSummaryPDF}>Descargar PDF</button>
            </div>
            <div className={styles.accountSummaryTable}>
              <BasicTable
                title="Item"
                columns={ACCOUNT_SUMMARY_ITEMS_COLUMNS(
                  confirmDeleteAccountSummaryItem
                )}
                data={accountSummaryItems}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  return {
    props: {}
  }
}
