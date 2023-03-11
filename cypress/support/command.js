Cypress.Commands.add("signup", ({ username, password }) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env().backendUrl}lubricentro_myc/account/signup/`,
    body: { username, password },
    failOnStatusCode: false // it prevents the test to fail if the user already exists
  })
})

Cypress.Commands.add("login", ({ username, password }) => {
  cy.signup({ username, password })
  cy.request(
    "POST",
    `${Cypress.env().backendUrl}lubricentro_myc/account/login/`,
    { username, password }
  ).then((response) => {
    cy.setCookie("lmyc_jwt", response.body["lmyc_jwt"])
    cy.visit("/")
  })
})
