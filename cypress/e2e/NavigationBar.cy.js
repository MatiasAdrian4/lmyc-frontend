import { testUser } from "../fixtures.js"

describe("Navigation Bar", () => {
  beforeEach(() => {
    cy.login(testUser)
  })

  it("Should navigate to sales page", () => {
    cy.getByDataCy("navigation-bar").contains("Ventas").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}sales`)
  })

  it("Should navigate to products page", () => {
    cy.getByDataCy("navigation-bar").contains("Productos").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}products`)
  })

  it("Should navigate to clients page", () => {
    cy.getByDataCy("navigation-bar").contains("Clientes").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}clients`)
  })

  it("Should navigate to invoices page", () => {
    cy.getByDataCy("navigation-bar").contains("Remitos").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}invoices`)
  })

  it("Should navigate to sales history page", () => {
    cy.getByDataCy("navigation-bar").contains("Historial de Ventas").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}sales-history`)
  })

  it("Should navigate to home page after logout", () => {
    cy.getByDataCy("navigation-bar").contains("Cerrar Sesión").click()
    cy.url().should("eq", Cypress.config().baseUrl)
  })
})
