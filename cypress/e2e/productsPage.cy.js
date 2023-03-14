import { testUser, testProducts } from "../fixtures.js"

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

  it("should display a table listing the products", () => {
    cy.getByDataCy("producto-table").should("exist")
    cy.getByDataCy("producto-table", "tbody tr").should("have.length", 10)
    cy.getByDataCy("producto-table", "tbody tr:first td:first").should(
      "have.text",
      15
    )
  })

  it("should be able to search products by code", () => {
    cy.getByDataCy("search-pagination").should("exist")
    cy.getByDataCy("search-pagination", "input").type("10553")
    cy.getByDataCy("producto-table", "tbody tr:first td:first").should(
      "have.text",
      10553
    )
  })

  it("should be able to search products by name", () => {
    cy.getByDataCy("search-pagination").should("exist")
    cy.getByDataCy("search-pagination", "input").type("CORREA GATES 10")
    cy.getByDataCy("producto-table", "tbody tr").should("have.length", 3)
    cy.getByDataCy("producto-table", "tbody tr:first td:first").should(
      "have.text",
      9668
    )
    cy.getByDataCy("producto-table", "tbody tr:nth-child(2) td:first").should(
      "have.text",
      9674
    )
    cy.getByDataCy("producto-table", "tbody tr:nth-child(3) td:first").should(
      "have.text",
      9691
    )
  })

  it("should be able to search products by category", () => {
    cy.getByDataCy("search-pagination").should("exist")
    cy.getByDataCy("search-pagination", "input").type("Tapas")
    cy.getByDataCy("producto-table", "tbody tr").should("have.length", 2)
    cy.getByDataCy("producto-table", "tbody tr:first td:first").should(
      "have.text",
      15101
    )
    cy.getByDataCy("producto-table", "tbody tr:nth-child(2) td:first").should(
      "have.text",
      15116
    )
  })

  it("should display a message when no products were found", () => {
    cy.getByDataCy("search-pagination").should("exist")
    cy.getByDataCy("search-pagination", "input").type("qwerty")
    cy.contains("No se encontraron productos.")
  })

  it("should be able to go to the next page and come back", () => {
    cy.getByDataCy("search-pagination", "button:first").should("be.disabled")
    cy.getByDataCy("search-pagination", "button:last").should("be.enabled")
    cy.getByDataCy("search-pagination", "button:last").click()
    cy.getByDataCy("producto-table", "tbody tr").should("have.length", 5)

    cy.getByDataCy("search-pagination", "button:first").should("be.enabled")
    cy.getByDataCy("search-pagination", "button:last").should("be.disabled")
    cy.getByDataCy("search-pagination", "button:first").click()
    cy.getByDataCy("producto-table", "tbody tr").should("have.length", 10)
  })

  it("should be able to open a product", () => {
    cy.getByDataCy("producto-table", "tbody tr:first td:last").click()
    cy.contains("Información del Producto")
    cy.getByDataCy("producto-form").should("exist")
    cy.getByDataCy("producto-form", "[id=detalle]").should(
      "have.value",
      "AC YPF ELAION MOTO 4T 20W50 X 1 LITRO"
    )
  })

  it("should be able to add a new product", () => {
    cy.getByDataCy("producto-form").should("exist")
    cy.getByDataCy("producto-form", "[id=detalle]").type("Test product")
    cy.getByDataCy("producto-form", "[id=stock]").type("10.0")
    cy.getByDataCy("producto-form", "[id=precio_costo]").type("360.5")
    cy.getByDataCy("producto-form", "button").click()

    cy.get(".swal2-container").contains("Producto creado satisfactoriamente.")
    cy.get(".swal2-container button.swal2-confirm").click()

    cy.getByDataCy("search-pagination", "input").type("Test product")
    cy.getByDataCy("producto-table", "tbody tr").should("have.length", 1)
    cy.getByDataCy("producto-table", "tbody tr:first td:nth-child(2)").should(
      "have.text",
      "Test product"
    )
  })
})
