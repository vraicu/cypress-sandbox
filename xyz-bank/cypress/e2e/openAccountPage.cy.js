import customersPage from "../support/POMs/customersPage";
import openAccountPage from "../support/POMs/openAccountPage";
describe("Open account page", () => {
  beforeEach(() => {
    cy.addCustomer({
      firstname: "Rubeus",
      lastname: "Hagrid",
      postcode: "E999KL",
    });
    cy.loadUsersFromLocalStorage();
  });

  describe("when adding a new account to a customer", () => {
    it("should show up in the customers view", () => {
      cy.fixture("customers.json").then((customers) => {
        const rubeusHagrid = customers.find(
          (c) => c.firstname === "Rubeus" && c.lastname === "Hagrid"
        );
        cy.openAccount({ customerId: rubeusHagrid.id, currency: "Pound" });
      });
      cy.loadUsersFromLocalStorage();
      cy.fixture("customers.json").then((customers) => {
        const rubeusHagrid = customers.find(
          (c) => c.firstname === "Rubeus" && c.lastname === "Hagrid"
        );
        cy.visit(`${Cypress.config("baseUrl")}/#/manager/list`);
        customersPage.elements
          .firstname(5)
          .should("contain.text", rubeusHagrid.firstname);
        customersPage.elements
          .lastname(5)
          .should("contain.text", rubeusHagrid.lastname);
        customersPage.elements
          .postcode(5)
          .should("contain.text", rubeusHagrid.postcode);
        customersPage.elements
          .accountNumber(5)
          .should("contain.text", rubeusHagrid.accountNumbers);
      });
    });
  });

  afterEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/#/manager/list`);
    customersPage.deleteCustomer(5);
  });
});
