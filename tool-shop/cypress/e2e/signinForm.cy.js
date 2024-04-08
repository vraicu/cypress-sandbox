import signinPage from "../support/POMs/signinPage";
import navbar from "../support/POMs/navbar";

describe("Sign in form", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    navbar.clickSignin();
  });

  describe("with invalid credentials", () => {
    it("should display error", () => {
      signinPage.elements.email().type("janedoe@mail.com");
      signinPage.elements.password().type("password");

      signinPage.clickLogin();

      signinPage.elements
        .loginError()
        .should("contain.text", "Invalid email or password");
    });
  });

  describe("with valid account", () => {
    describe("with invalid password", () => {
      describe("when trying to log in repeateadly", () => {
        it("should lock account", () => {
          signinPage.elements.email().type("jdoe@mail.com");
          signinPage.elements.password().type("password");

          signinPage.clickLogin();
          signinPage.clickLogin();

          signinPage.elements
            .loginError()
            .should(
              "contain.text",
              "Account locked, too many failed attempts. Please contact the administrator."
            );
        });
      });
    });

    describe("with valid password", () => {
      it("should log in successfully", () => {
        cy.fixture("login").then((user) => {
          cy.login(user.email, user.password);
          navbar.elements.menu().should("contain.text", "John Doe");
        });
      });
    });
  });
});
