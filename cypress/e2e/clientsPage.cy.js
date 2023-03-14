import { testUser, testClients } from "../fixtures.js"

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
