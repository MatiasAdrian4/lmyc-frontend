describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('Should open login page', () => {
    cy.contains('Lubricentro M&C')
  })

  it("Should throw an error trying to login with an incorrect username or password", () => {
    cy.get('[data-cy="login-form"] input').first().type("incorrect_username")
    cy.get('[data-cy="login-form"] input').last().type("incorrect_password")
    cy.get('[data-cy="login-form"] button').click()
    cy.url().should("eq", Cypress.config().baseUrl)
    cy.contains('Se ha producido un error.')
  })

  it("Should correctly login", () => {
    cy.get('[data-cy="login-form"] input').first().type(Cypress.env("lmycUsername"))
    cy.get('[data-cy="login-form"] input').last().type(Cypress.env("lmycPassword"))
    cy.get('[data-cy="login-form"] button').click()
    cy.url().should("eq", `${Cypress.config().baseUrl}sales`)
  })
})
