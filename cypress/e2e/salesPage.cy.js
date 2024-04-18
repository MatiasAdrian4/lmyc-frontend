import { invoicesUrl } from "../constants.js"
import {
  testUser,
  client4,
  product10553,
  product64049,
  product10747,
  product9668,
  product10518,
  product9712,
  product10700,
  product15
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
      product10700,
      product15
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

  it("should be able to make a sell", () => {
    cy.getByDataCy("sale-type", "button:last")
      .should("have.text", "Venta")
      .should("be.disabled")

    cy.get("[id=sales] button:first").click()
    cy.contains("Buscador de Productos")

    // add a product to cart
    cy.getByDataCy("producto-search-pagination", "input").type("portalampara")
    cy.getByDataCy("producto-table", "tbody tr td:nth-child(3) button").click()
    cy.getByDataCy("cart-table", "tbody tr").should("have.length", 2)
    cy.getByDataCy("cart-table", "tbody tr td:nth-child(1)").should(
      "have.text",
      64049
    )

    // add another product to cart
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
      "tbody tr:nth-child(3) td:nth-child(5) input"
    ).should("have.value", 0)

    // set quantities for each product
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(1) td:nth-child(4) input"
    ).type("2")
    cy.getByDataCy("sale-type", "button:last")
      .should("have.text", "Venta")
      .should("be.enabled")
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(2) td:nth-child(4) input"
    ).type("3")
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(3) td:nth-child(5) input"
    ).should("have.value", 3062.24)

    // make sale
    cy.getByDataCy("sale-type", "button:last").click()
    cy.get(".swal2-container").contains("Venta registrada correctamente.")
    cy.get(".swal2-container button.swal2-confirm").click()

    // check if sale is present in sales history page
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

  it("should be able to generate an invoice", () => {
    cy.getByDataCy("sale-type", "button:last")
      .should("have.text", "Venta")
      .should("be.disabled")

    cy.get("[id=sales] button:first").click()
    cy.contains("Buscador de Productos")

    // add a product to cart
    cy.getByDataCy("producto-search-pagination", "input").type("ca 11104 fiat")
    cy.getByDataCy("producto-table", "tbody tr td:nth-child(3) button").click()
    cy.getByDataCy("cart-table", "tbody tr").should("have.length", 2)
    cy.getByDataCy("cart-table", "tbody tr td:nth-child(1)").should(
      "have.text",
      10518
    )

    // add another product to cart
    cy.get("[id=sales] button:first").click()
    cy.getByDataCy("producto-search-pagination", "input").type("AC YPF elaion")
    cy.getByDataCy("producto-table", "tbody tr td:nth-child(3) button").click()
    cy.getByDataCy("cart-table", "tbody tr").should("have.length", 3)
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(2) td:nth-child(1)"
    ).should("have.text", 15)

    // search for a client
    cy.getByDataCy("sale-type", "[name=saleType]:last").click()
    cy.getByDataCy("sale-type", "button:first").click()
    cy.getByDataCy("cliente-search-pagination", "input").type("diaz")
    cy.getByDataCy("cliente-table", "tbody tr td:nth-child(3) button").click()
    cy.getByDataCy("client-selected").should("have.value", "Diaz, Martina")

    // set quantities for each product
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(1) td:nth-child(4) input"
    ).type("2")
    cy.getByDataCy("sale-type", "button:last")
      .should("have.text", "Generar Remito")
      .should("be.enabled")
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(2) td:nth-child(4) input"
    ).type("1.5")
    cy.getByDataCy(
      "cart-table",
      "tbody tr:nth-child(3) td:nth-child(5) input"
    ).should("have.value", 4012.55)

    // generate invoice
    cy.intercept("POST", invoicesUrl).as("invoiceCreation")
    cy.getByDataCy("sale-type", "button:last").click()
    cy.wait("@invoiceCreation").then((interception) => {
      const invoiceId = interception.response.body.codigo
      cy.get(".swal2-container").contains(
        "El remito fue generado correctamente."
      )
      cy.get(".swal2-container button.swal2-confirm").click()
      cy.readFile(`cypress/downloads/remito_${invoiceId}.pdf`)
    })

    // check if invoice is present in invoices page
    cy.visit("/invoices")
    cy.getByDataCy("remito-table", "tbody tr").should("have.length", 1)
    cy.getByDataCy("remito-table", "tbody tr td:nth-child(2)").should(
      "have.text",
      "Diaz, Martina"
    )
    cy.getByDataCy("remito-table", "tbody tr td:nth-child(4)").contains(
      "2 und. - 10518 (CA 11104 FIATUNO 1.4 (FRAM))"
    )
    cy.getByDataCy("remito-table", "tbody tr td:nth-child(4)").contains(
      "1.5 und. - 15 (AC YPF ELAION MOTO 4T 20W50 X 1 LITRO)"
    )
  })
})
