import {
  jwtToken,
  signupUrl,
  loginUrl,
  productsUrl,
  clientsUrl,
  invoicesUrl,
  resetDBUrl
} from "../constants.js"

Cypress.Commands.add("getByDataCy", (dataCy, extra = "") => {
  cy.get(`[data-cy="${dataCy}"] ${extra}`)
})

Cypress.Commands.add("signup", ({ username, password }) => {
  cy.request({
    method: "POST",
    url: signupUrl,
    body: { username, password },
    failOnStatusCode: false // it prevents the test to fail if the user already exists
  })
})

Cypress.Commands.add("login", ({ username, password }) => {
  cy.signup({ username, password })
  cy.request({
    method: "POST",
    url: loginUrl,
    body: { username, password }
  }).then((response) => {
    cy.setCookie(jwtToken, response.body["lmyc_jwt"])
    cy.visit("/")
  })
})

Cypress.Commands.add("loadProduct", (product) => {
  cy.request({ method: "POST", url: productsUrl, body: product })
})

Cypress.Commands.add("loadProducts", (products) => {
  products.forEach((product) => {
    cy.loadProduct(product)
  })
})

Cypress.Commands.add("loadClient", (client) => {
  cy.request({ method: "POST", url: clientsUrl, body: client })
})

Cypress.Commands.add("loadClients", (clients) => {
  clients.forEach((client) => {
    cy.loadClient(client)
  })
})

Cypress.Commands.add("loadInvoice", (invoice) => {
  cy.request({ method: "POST", url: invoicesUrl, body: invoice })
})

Cypress.Commands.add("resetDB", () => {
  cy.request({ method: "GET", url: resetDBUrl })
})
