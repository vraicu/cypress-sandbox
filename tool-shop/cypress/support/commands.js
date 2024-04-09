import navbar from "./POMs/navbar";
import signinPage from "./POMs/signinPage";
import registrationJson from "../fixtures/registration.json";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.visit(Cypress.config("baseUrl"));
  navbar.clickSignin();
  signinPage.elements.email().type(email);
  signinPage.elements.password().type(password);
  signinPage.clickLogin();
});

Cypress.Commands.add("register", (email = "jdoe@mail.com") => {
  cy.request({
    failOnStatusCode: false,
    method: "POST",
    url: `${Cypress.config("apiUrl")}/users/register`,
    body: {
      ...registrationJson,
      email,
    },
  }).then((response) => {
    cy.writeFile("cypress/fixtures/login.json", {
      email,
      password: registrationJson.password,
      id: response.body.id,
    });
  });
});
