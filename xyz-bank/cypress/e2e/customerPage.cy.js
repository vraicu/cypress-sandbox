import customersPage from "../support/POMs/customersPage";
import customerPage from "../support/POMs/customerPage";
import homePage from "../support/POMs/homePage";

describe("Customer page", () => {
  beforeEach(() => {
    cy.addCustomer({
      firstname: "Rubeus",
      lastname: "Hagrid",
      postcode: "E999KL",
    });
    cy.loadUsersFromLocalStorage();
    cy.fixture("customers.json").then((customers) => {
      const rubeusHagrid = customers.find(
        (c) => c.firstname === "Rubeus" && c.lastname === "Hagrid"
      );
      cy.openAccount({ customerId: rubeusHagrid.id, currency: "Dollar" });
      cy.openAccount({ customerId: rubeusHagrid.id, currency: "Pound" });
      cy.openAccount({ customerId: rubeusHagrid.id, currency: "Rupee" });

      cy.visit(`${Cypress.config("baseUrl")}`);
      homePage.loginAsCustomer();
      cy.login({ customerId: rubeusHagrid.id });
      cy.loadUsersFromLocalStorage("customersWithAcc.json");
    });
  });

  it("should show the correct balance for the current account", () => {
    cy.fixture("customersWithAcc.json").then((customers) => {
      const rubeusHagrid = customers.find(
        (c) => c.firstname === "Rubeus" && c.lastname === "Hagrid"
      );

      const [accountNumber] = rubeusHagrid.accountNumbers.split(" ");
      cy.log(rubeusHagrid.accountNumbers);
      customerPage.elements
        .username()
        .should(
          "contain.text",
          `${rubeusHagrid.firstname} ${rubeusHagrid.lastname}`
        );
      customerPage.elements
        .accountNumber()
        .should("contain.text", accountNumber);
      customerPage.elements.balance().should("contain.text", "0");
      customerPage.elements.currency().should("contain.text", "Dollar");
    });
  });

  describe("when selecting another account", () => {
    it("should display the correct balance", () => {
      cy.fixture("customersWithAcc.json").then((customers) => {
        const rubeusHagrid = customers.find(
          (c) => c.firstname === "Rubeus" && c.lastname === "Hagrid"
        );
        const accNumbers = rubeusHagrid.accountNumbers.split(" ");

        customerPage.elements.accountSelect().select(`number:${accNumbers[1]}`);

        customerPage.elements
          .username()
          .should(
            "contain.text",
            `${rubeusHagrid.firstname} ${rubeusHagrid.lastname}`
          );
        customerPage.elements
          .accountNumber()
          .should("contain.text", accNumbers[1]);
        customerPage.elements.balance().should("contain.text", "0");
        customerPage.elements.currency().should("contain.text", "Pound");
      });
    });
  });

  describe("when withdrawing", () => {
    describe("more than the balance", () => {
      it("should display an error", () => {
        customerPage.makeAWithdral(12);
        customerPage.elements
          .errorMessage()
          .should(
            "contain.text",
            "Transaction Failed. You can not withdraw amount more than the balance."
          );
      });
    });

    describe("less than the balance", () => {
      beforeEach(() => {
        customerPage.makeADeposit(12);
      });
      it.only("should update the balance acordingly", () => {
        customerPage.makeAWithdral(6);

        customerPage.elements.balance().should("contain.text", "6");
      });
    });
  });

  afterEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/#/manager/list`);
    customersPage.deleteCustomer(5);
  });
});
