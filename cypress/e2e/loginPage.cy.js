import { testUser } from "../fixtures.js"

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Should open login page", () => {
    cy.contains("Lubricentro M&C")
  })

  it("Should throw an error trying to login with an incorrect username or password", () => {
    cy.getByDataCy("login-form", "input").first().type("incorrect_username")
    cy.getByDataCy("login-form", "input").last().type("incorrect_password")
    cy.getByDataCy("login-form", "button").click()
    cy.url().should("eq", Cypress.config().baseUrl)
    cy.contains("Se ha producido un error.")
  })

  it("Should correctly login", () => {
    cy.signup(testUser)
    cy.getByDataCy("login-form", "input")
      .first()
      .type(Cypress.env("lmycUsername"))
    cy.getByDataCy("login-form", "input")
      .last()
      .type(Cypress.env("lmycPassword"))
    cy.getByDataCy("login-form", "button").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}sales`)
  })
})
