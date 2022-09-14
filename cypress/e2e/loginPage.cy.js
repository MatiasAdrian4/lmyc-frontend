describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Should throw an error trying to login with an incorrect username or password", () => {
    cy.get('[data-cy="username"]').type("incorrect_username")
    cy.get('[data-cy="password"]').type("incorrect_password")
    cy.get('[data-cy="login-button"]').click()
    cy.url().should("eq", Cypress.config().baseUrl)
    cy.get('[data-cy="errorMessage"]').should(
      "have.text",
      "Se ha producido un error."
    )
  })

  it("Should correctly login", () => {
    cy.get('[data-cy="username"]').type(Cypress.env("lmyc_username"))
    cy.get('[data-cy="password"]').type(Cypress.env("lmyc_password"))
    cy.get('[data-cy="login-button"]').click()
    cy.url().should("eq", `${Cypress.config().baseUrl}sales`)
  })
})
