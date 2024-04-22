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

import addCustomerPage from "./POMs/addCustomerPage";
import openAccountPage from "./POMs/openAccountPage";
import customerLoginPage from "./POMs/customerLoginPage";

Cypress.Commands.add("addCustomer", ({ firstname, lastname, postcode }) => {
  cy.visit(`${Cypress.config("baseUrl")}/#/manager/addCust`);
  addCustomerPage.setFirstname(firstname);
  addCustomerPage.setLastname(lastname);
  addCustomerPage.setPostcode(postcode);
  addCustomerPage.addCustomer();
});

Cypress.Commands.add("openAccount", ({ customerId, currency }) => {
  cy.visit(`${Cypress.config("baseUrl")}/#/manager/openAccount`);
  openAccountPage.elements.customerSelect().select(customerId);
  openAccountPage.elements.currencySelect().select(currency);
  openAccountPage.submitAccount();
});

Cypress.Commands.add("login", ({ customerId }) => {
  cy.visit(`${Cypress.config("baseUrl")}/#/customer`);
  customerLoginPage.elements.customerSelect().select(customerId);
  customerLoginPage.login();
});

Cypress.Commands.add(
  "loadUsersFromLocalStorage",
  (filename = "customers.json") => {
    cy.getAllLocalStorage().then((result) => {
      const user = JSON.parse(result["https://www.globalsqa.com"].User);
      const customers = [];
      for (const id of Object.keys(user)) {
        const { fName, lName, postCd, accountNo } = user[id];

        customers.push({
          firstname: fName,
          lastname: lName,
          postcode: postCd,
          id,
          accountNumbers: (accountNo ?? []).join(" "),
        });
      }
      cy.writeFile(`cypress/fixtures/${filename}`, customers);
    });
  }
);
