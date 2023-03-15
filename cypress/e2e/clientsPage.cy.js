import { testUser, testClients, client1, product10553 } from "../fixtures.js"

describe("Clients Page", () => {
  before(() => {
    cy.login(testUser)
    cy.loadClients(testClients)
  })

  after(() => {
    cy.resetDB()
  })

  beforeEach(() => {
    cy.login(testUser)
    cy.visit("/clients")
  })

  it("should display a table listing the clients", () => {
    cy.getByDataCy("cliente-table").should("exist")
    cy.getByDataCy("cliente-table", "tbody tr").should("have.length", 10)
    cy.getByDataCy("cliente-table", "tbody tr:first td:nth-child(2)").should(
      "have.text",
      "Perez, Pablo"
    )
  })

  it("should be able to search clients by name", () => {
    cy.getByDataCy("search-pagination").should("exist")
    cy.getByDataCy("search-pagination", "input").type("Perez")
    cy.getByDataCy("cliente-table", "tbody tr").should("have.length", 3)
    cy.getByDataCy("cliente-table", "tbody tr:first td:nth-child(2)").should(
      "have.text",
      "Perez, Pablo"
    )
    cy.getByDataCy(
      "cliente-table",
      "tbody tr:nth-child(2) td:nth-child(2)"
    ).should("have.text", "Perez, Juan")
    cy.getByDataCy(
      "cliente-table",
      "tbody tr:nth-child(3) td:nth-child(2)"
    ).should("have.text", "Perez, Ricardo")
  })

  it("should display a message when no clients were found", () => {
    cy.getByDataCy("search-pagination").should("exist")
    cy.getByDataCy("search-pagination", "input").type("qwerty")
    cy.contains("No se encontraron clientes.")
  })

  it("should be able to go to the next page and come back", () => {
    cy.getByDataCy("search-pagination", "button:first").should("be.disabled")
    cy.getByDataCy("search-pagination", "button:last").should("be.enabled")
    cy.getByDataCy("search-pagination", "button:last").click()
    cy.getByDataCy("cliente-table", "tbody tr").should("have.length", 2)

    cy.getByDataCy("search-pagination", "button:first").should("be.enabled")
    cy.getByDataCy("search-pagination", "button:last").should("be.disabled")
    cy.getByDataCy("search-pagination", "button:first").click()
    cy.getByDataCy("cliente-table", "tbody tr").should("have.length", 10)
  })

  it("should be able to open a client", () => {
    cy.getByDataCy("cliente-table", "tbody tr:first td:last").click()
    cy.contains("Información del Cliente")
    cy.getByDataCy("cliente-form").should("exist")
    cy.getByDataCy("cliente-form", "[id=nombre]").should(
      "have.value",
      "Perez, Pablo"
    )
  })

  it("should be able to add a new client", () => {
    cy.getByDataCy("cliente-form").should("exist")
    cy.getByDataCy("cliente-form", "[id=nombre]").type("Test, Client")
    cy.getByDataCy("cliente-form", "[id=cuit]").type("1234567890")
    cy.getByDataCy("cliente-form", "[id=email]").type("client.test@gmail.com")
    cy.getByDataCy("cliente-form", "button").click()

    cy.get(".swal2-container").contains("Cliente creado satisfactoriamente.")
    cy.get(".swal2-container button.swal2-confirm").click()

    cy.getByDataCy("search-pagination", "input").type("Test, Client")
    cy.getByDataCy("cliente-table", "tbody tr").should("have.length", 1)
    cy.getByDataCy("cliente-table", "tbody tr:first td:nth-child(2)").should(
      "have.text",
      "Test, Client"
    )
  })
})

describe("Single Client Page", () => {
  let clientId

  before(() => {
    cy.login(testUser)

    cy.loadClient(client1).then((response) => {
      clientId = response.body.id
      cy.loadProduct(product10553).then((response) => {
        cy.loadInvoice({
          cliente: clientId,
          elementos_remito: [{ producto: response.body.codigo, cantidad: 2.5 }]
        })
      })
    })
  })

  after(() => {
    cy.resetDB()
  })

  beforeEach(() => {
    cy.login(testUser)
    cy.visit(`/clients/${clientId}`)
  })

  it("should display the client form", () => {
    cy.contains("Información del Cliente")
    cy.getByDataCy("cliente-form").should("exist")
    cy.getByDataCy("cliente-form", "[id=nombre]").should(
      "have.value",
      "Perez, Pablo"
    )
  })

  it("should be able to edit the client", () => {
    cy.getByDataCy("cliente-form", "[id=localidad]").clear().type("La Dulce")
    cy.getByDataCy("cliente-form", "[id=codigo_postal]").clear().type("7637")
    cy.getByDataCy("cliente-form", "button").click()

    cy.get(".swal2-container").contains(
      "Cliente actualizado satisfactoriamente."
    )
    cy.get(".swal2-container button.swal2-confirm").click()

    cy.visit(`/clients/${clientId}`)
    cy.getByDataCy("cliente-form", "[id=localidad]").should(
      "have.value",
      "La Dulce"
    )
    cy.getByDataCy("cliente-form", "[id=codigo_postal]").should(
      "have.value",
      "7637"
    )
  })

  it("should be able to see the client's debts", () => {
    cy.getByDataCy("client-debts").contains(
      "La deuda al dia de la fecha es de $3299.00."
    )
    cy.getByDataCy("client-debts", "button").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}billing/${clientId}`)
  })

  it("should be able to see the client's invoices", () => {
    cy.getByDataCy("cliente-table").should("exist")
    cy.getByDataCy("cliente-table", "tbody tr").should("have.length", 1)
    cy.getByDataCy("cliente-table", "tbody tr td:nth-child(3)").should(
      "have.text",
      "2.5 und. - 10553 (PH 3569 VW POLO 1.9(FRAM))"
    )
  })
})
