import customersPage from "../support/POMs/customersPage";

describe("Add Customer page", () => {
  describe("when adding a new customer", () => {
    beforeEach(() => {
      cy.addCustomer({
        firstname: "Rubeus",
        lastname: "Hagrid",
        postcode: "E999KL",
      });
      cy.loadUsersFromLocalStorage();
    });

    it("should appear in the customers view", () => {
      cy.visit(`${Cypress.config("baseUrl")}/#/manager/list`);

      cy.fixture("customers.json").then((customers) => {
        for (let i = 0; i < customers.length; i++) {
          const { firstname, lastname, postcode, accountNumbers } =
            customers[i];
          customersPage.elements.firstname(i).should("contain.text", firstname);
          customersPage.elements.lastname(i).should("contain.text", lastname);
          customersPage.elements.postcode(i).should("contain.text", postcode);
          customersPage.elements
            .accountNumber(i)
            .should("contain.text", accountNumbers);
        }
      });
    });

    afterEach(() => {
      customersPage.deleteCustomer(5);
    });
  });
});
