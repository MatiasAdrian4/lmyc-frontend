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

  it.only("should be able to make a sell", () => {
    cy.get("[id=sales] button:first").click()
    cy.contains("Buscador de Productos")

    cy.getByDataCy("producto-search-pagination", "input").type("portalampara")
    cy.getByDataCy("producto-table", "tbody tr td:nth-child(3) button").click()
    cy.getByDataCy("cart-table", "tbody tr").should("have.length", 2)
    cy.getByDataCy("cart-table", "tbody tr td:nth-child(1)").should(
      "have.text",
      64049
    )

    cy.get("[id=sales] button:first").click()
    cy.getByDataCy("producto-search-pagination", "input").type(
      "correa gates 10 x 9"
    )
    cy.getByDataCy("producto-table", "tbody tr td:nth-child(3) button").click()
    cy.getByDataCy("cart-table", "tbody tr").should("have.length", 3)
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(2) td:nth-child(1)"
    ).should("have.text", 9668)

    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(1) td:nth-child(4) input"
    ).type("2")
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(2) td:nth-child(4) input"
    ).type("3")
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(3) td:nth-child(5) input"
    ).should("have.value", 3062.24)
    cy.getByDataCy("sale-type", "button:last").click()

    cy.get(".swal2-container").contains("Venta registrada correctamente.")
    cy.get(".swal2-container button.swal2-confirm").click()

    cy.visit("/sales-history")
    cy.getByDataCy(
      "venta-search-pagination",
      "[class='react-datepicker__input-container'] input"
    ).type(new Date().toJSON().slice(0, 10).split("-").reverse().join("/"))

    cy.getByDataCy("venta-table", "tbody tr").should("have.length", 2)

    cy.getByDataCy(
      "venta-table",
      "tbody tr:nth-child(1) td:nth-child(1)"
    ).should("have.text", "PORTALAMPARA F-100 2 POLOS")
    cy.getByDataCy(
      "venta-table",
      "tbody tr:nth-child(1) td:nth-child(2)"
    ).should("have.text", "2")
    cy.getByDataCy(
      "venta-table",
      "tbody tr:nth-child(1) td:nth-child(3)"
    ).should("have.text", "138.74")

    cy.getByDataCy(
      "venta-table",
      "tbody tr:nth-child(2) td:nth-child(1)"
    ).should("have.text", "CORREA GATES 10 X 970")
    cy.getByDataCy(
      "venta-table",
      "tbody tr:nth-child(2) td:nth-child(2)"
    ).should("have.text", "3")
    cy.getByDataCy(
      "venta-table",
      "tbody tr:nth-child(2) td:nth-child(3)"
    ).should("have.text", "2923.50")
  })

  it("should be able to generate an invoice", () => {})
})
