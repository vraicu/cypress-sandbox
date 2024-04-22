import homePage from "../support/POMs/homePage";
import bankManagerLoginPage from "../support/POMs/bankManagerLoginPage";
import customersPage from "../support/POMs/customersPage";

describe("Customers page", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}`);
    homePage.loginAsBankManager();
    bankManagerLoginPage.showCustomers();
  });

  describe("when searching by", () => {
    describe("first name", () => {
      describe("that exist", () => {
        it("should return results", () => {
          const expectedResults = [
            {
              firstname: "Hermoine",
              lastname: "Granger",
              postcode: "E859AB",
              accountNumbers: "1001 1002 1003",
            },
            {
              firstname: "Neville",
              lastname: "Longbottom",
              postcode: "E89898",
              accountNumbers: "1013 1014 1015",
            },
          ];
          customersPage.filterCustomers("ne");

          for (let i = 0; i < 2; i++) {
            const { firstname, lastname, postcode, accountNumbers } =
              expectedResults[i];
            customersPage.elements
              .firstname(i)
              .should("contain.text", firstname);
            customersPage.elements.lastname(i).should("contain.text", lastname);
            customersPage.elements.postcode(i).should("contain.text", postcode);
            customersPage.elements
              .accountNumber(i)
              .should("contain.text", accountNumbers);
          }
        });
      });

      describe("that do not exist", () => {
        it("should not return anything", () => {
          customersPage.filterCustomers("Voldemort");
          cy.get("tbody").children().should("have.length", 0);
        });
      });
    });

    describe("last name", () => {
      describe("that exist", () => {
        it("should return results", () => {
          customersPage.filterCustomers("re");

          customersPage.elements.firstname(0).should("contain.text", "Albus");
          customersPage.elements
            .lastname(0)
            .should("contain.text", "Dumbledore");
          customersPage.elements.postcode(0).should("contain.text", "E55656");
          customersPage.elements
            .accountNumber(0)
            .should("contain.text", "1010 1011 1012");
        });
      });

      describe("that do not exist", () => {
        it("should not return anything", () => {
          customersPage.filterCustomers("Voldemort");
          cy.get("tbody").children().should("have.length", 0);
        });
      });
    });

    describe("post code", () => {
      describe("that exist", () => {
        it("should return results", () => {
          const expectedResults = [
            {
              firstname: "Ron",
              lastname: "Weasly",
              postcode: "E55555",
              accountNumbers: "1007 1008 1009",
            },
            {
              firstname: "Albus",
              lastname: "Dumbledore",
              postcode: "E55656",
              accountNumbers: "1010 1011 1012",
            },
          ];
          customersPage.filterCustomers("55");

          for (let i = 0; i < 2; i++) {
            const { firstname, lastname, postcode, accountNumbers } =
              expectedResults[i];
            customersPage.elements
              .firstname(i)
              .should("contain.text", firstname);
            customersPage.elements.lastname(i).should("contain.text", lastname);
            customersPage.elements.postcode(i).should("contain.text", postcode);
            customersPage.elements
              .accountNumber(i)
              .should("contain.text", accountNumbers);
          }
        });
      });

      describe("that do not exist", () => {
        it("should not return anything", () => {
          customersPage.filterCustomers("990");
          cy.get("tbody").children().should("have.length", 0);
        });
      });
    });

    describe("account number", () => {
      describe("that exist", () => {
        it("should return results", () => {
          customersPage.filterCustomers("101");

          customersPage.elements.firstname(0).should("contain.text", "Albus");
          customersPage.elements
            .lastname(0)
            .should("contain.text", "Dumbledore");
          customersPage.elements.postcode(0).should("contain.text", "E55656");
          customersPage.elements
            .accountNumber(0)
            .should("contain.text", "1010 1011 1012");
        });
      });

      describe("that do not exist", () => {
        it("should not return anything", () => {
          customersPage.filterCustomers("0090");
          cy.get("tbody").children().should("have.length", 0);
        });
      });
    });
  });

  describe("when clicking on the delete button", () => {
    beforeEach(() => {
      cy.addCustomer({
        firstname: "Draco",
        lastname: "Malfoy",
        postcode: "E585UP",
      });
      cy.visit(`${Cypress.config("baseUrl")}`);
      homePage.loginAsBankManager();
      bankManagerLoginPage.showCustomers();
    });

    it("should remove row from table", () => {
      customersPage.deleteCustomer(5);
      cy.loadUsersFromLocalStorage();

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
  });
});
