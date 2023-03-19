import {
  testUser,
  client4,
  product10553,
  product64049,
  product10747,
  product9668,
  product10518,
  product9712,
  product10700
} from "../fixtures.js"

describe("Sales Page", () => {
  before(() => {
    cy.login(testUser)
    cy.loadProducts([
      product10553,
      product64049,
      product10747,
      product9668,
      product10518,
      product9712,
      product10700
    ])
    cy.loadClient(client4)
  })

  after(() => {
    cy.resetDB()
  })

  beforeEach(() => {
    cy.login(testUser)
    cy.visit("/sales")
  })

  it("should display cart table", () => {
    cy.get("[id=sales] button:first").should("have.text", "Agregar Producto")

    cy.getByDataCy("cart-table", "tbody tr").should("have.length", 1)
    cy.getByDataCy("cart-table", "tbody tr td:nth-child(5) input").should(
      "have.value",
      0
    )
  })

  it("should allows to search a client when Cta. Cte. is selected", () => {
    cy.getByDataCy("sale-type", "[name=saleType]:first").as("cashSale")
    cy.getByDataCy("sale-type", "[name=saleType]:last").as("invoiceSale")
    cy.getByDataCy("sale-type", "button:first")
      .should("have.text", "Buscar Cliente")
      .as("searchClient")
    cy.getByDataCy("client-selected").as("clientSelected")
    cy.getByDataCy("sale-type", "button:last").as("saleAction")

    cy.get("@cashSale").should("be.checked")
    cy.get("@invoiceSale").should("not.be.checked")
    cy.get("@searchClient").should("be.disabled")
    cy.get("@clientSelected").should("have.value", "")
    cy.get("@saleAction").should("have.text", "Venta")

    cy.get("@invoiceSale").click()
    cy.get("@cashSale").should("not.be.checked")
    cy.get("@invoiceSale").should("be.checked")
    cy.get("@searchClient").should("be.enabled")
    cy.get("@saleAction").should("have.text", "Generar Remito")

    cy.get("@searchClient").click()
    cy.contains("Buscador de Clientes")
    cy.getByDataCy("cliente-search-pagination", "input").type("diaz")
    cy.getByDataCy("cliente-table", "tbody tr td:nth-child(3) button").click()
    cy.get("@clientSelected").should("have.value", "Diaz, Martina")
  })
})
