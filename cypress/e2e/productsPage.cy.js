import { testUser, testProducts } from "../constants.js"

describe("Products Page", () => {
  before(() => {
    cy.login(testUser)
    cy.loadProducts(testProducts)
  })

  after(() => {
    cy.resetDB()
  })

  beforeEach(() => {
    cy.login(testUser)
    cy.visit("/products")
  })

  it("should display a list of products", () => {})
})
