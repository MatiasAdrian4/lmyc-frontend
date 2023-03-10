Cypress.Commands.add("login", ({ username, password }) => {
  cy.request(
    "POST",
    `${Cypress.env().backendUrl}lubricentro_myc/account/login/`,
    { username, password }
  ).then((response) => {
    cy.setCookie("lmyc_jwt", response.body["lmyc_jwt"])
    cy.visit("/")
  })
})
