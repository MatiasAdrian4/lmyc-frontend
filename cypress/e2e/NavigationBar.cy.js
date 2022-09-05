describe("Navigation Bar", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[data-cy="username"]').type(Cypress.env("lmyc_username"))
    cy.get('[data-cy="password"]').type(Cypress.env("lmyc_password"))
    cy.get('[data-cy="login-button"]').click()
  })

  it("Should navigate to sales page", () => {
    cy.get("[data-cy=navigation-bar]").contains("Ventas").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}sales`)
  })

  it("Should navigate to products page", () => {
    cy.get("[data-cy=navigation-bar]").contains("Productos").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}products`)
  })

  it("Should navigate to clients page", () => {
    cy.get("[data-cy=navigation-bar]").contains("Clientes").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}clients`)
  })

  it("Should navigate to invoices page", () => {
    cy.get("[data-cy=navigation-bar]").contains("Remitos").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}invoices`)
  })

  it("Should navigate to sales history page", () => {
    cy.get("[data-cy=navigation-bar]").contains("Historial de Ventas").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}sales-history`)
  })

  it("Should navigate to home page after logout", () => {
    cy.get("[data-cy=navigation-bar]").contains("Cerrar Sesión").click()
    cy.url().should("eq", Cypress.config().baseUrl)
  })
})
