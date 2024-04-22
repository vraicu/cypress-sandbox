import homePage from "../support/POMs/homePage";
import customerPage from "../support/POMs/customerPage";

describe("Customer login page", () => {
  beforeEach(() => {
    cy.addCustomer({
      firstname: "Rubeus",
      lastname: "Hagrid",
      postcode: "E999KL",
    });
    cy.loadUsersFromLocalStorage();
    cy.visit(`${Cypress.config("baseUrl")}`);
    homePage.loginAsCustomer();
  });

  describe("for a customer with no account(s)", () => {
    it("should advise to open an account", () => {
      cy.fixture("customers.json").then((customers) => {
        const rubeusHagrid = customers.find(
          (c) => c.firstname === "Rubeus" && c.lastname === "Hagrid"
        );

        cy.login({ customerId: rubeusHagrid.id });

        customerPage.elements
          .username()
          .should(
            "contain.text",
            `${rubeusHagrid.firstname} ${rubeusHagrid.lastname}`
          );
        cy.get('span[ng-show="noAccount"]').should(
          "contain.text",
          "Please open an account with us."
        );
      });
    });
  });
});
