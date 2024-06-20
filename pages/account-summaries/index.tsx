import { GetServerSideProps } from "next"
import { isUserAuthenticated, ssRedirectToLoginPage } from "utils/utils"
import styles from "styles/account-summaries/AccountSummaries.module.css"
import { useRef, useState } from "react"
import { Client } from "lmyc_client"
import { SearchModal } from "components/SearchModal"
import { SEARCH_CLIENT_COLUMNS } from "components/table/columns"
import { getClients } from "api/fetch"
import { Models } from "utils/constants"

interface ModalRef {
  closeModal: () => void
}

export default function AccountSummariesList({}) {
  const clientModalRef = useRef<ModalRef | null>(null)

  const [client, setClient] = useState<Client | null>(null)

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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await isUserAuthenticated(ctx))) return ssRedirectToLoginPage()

  return {
    props: {}
  }
}
