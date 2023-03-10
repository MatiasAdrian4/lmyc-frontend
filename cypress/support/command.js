Cypress.Commands.add("signup", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env().backendUrl}lubricentro_myc/account/signup/`,
    body: {
      username: Cypress.env("lmycUsername"),
      password: Cypress.env("lmycPassword")
    },
    failOnStatusCode: false // it prevents the test to fail if the user already exists
  })
})

Cypress.Commands.add("login", () => {
  cy.signup()
  cy.request(
    "POST",
    `${Cypress.env().backendUrl}lubricentro_myc/account/login/`,
    {
      username: Cypress.env("lmycUsername"),
      password: Cypress.env("lmycPassword")
    }
  ).then((response) => {
    cy.setCookie("lmyc_jwt", response.body["lmyc_jwt"])
    cy.visit("/")
  })
})
