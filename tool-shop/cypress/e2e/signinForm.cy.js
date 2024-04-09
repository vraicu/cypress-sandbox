import signinPage from "../support/POMs/signinPage";
import navbar from "../support/POMs/navbar";
import forgotPasswordPage from "../support/POMs/forgotPasswordPage";

describe("Sign in form", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    navbar.clickSignin();
  });

  describe("with empty fields", () => {
    it("should display errors", () => {
      signinPage.clickLogin();

      signinPage.elements
        .emailError()
        .should("contain.text", "E-mail is required.");
      signinPage.elements
        .passwordError()
        .should("contain.text", "Password is required.");
    });
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
          const email = "account@locked.com";
          cy.register(email);
          signinPage.elements.email().type(email);
          signinPage.elements.password().type("password");

          signinPage.clickLogin();
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
        cy.register("jh.doe@mail.com");
        cy.fixture("login").then((user) => {
          cy.login(user.email, user.password);
          navbar.elements.menu().should("contain.text", "John Doe");
        });
      });
    });
  });

  describe("when forgot password", () => {
    beforeEach(() => {
      signinPage.clickForgotYourPassword();
    });

    describe("with valid email", () => {
      it("should reset password", () => {
        cy.fixture("login.json", (user) => {
          forgotPasswordPage.elements.email().type(user.email);

          cy.get('[role="alert"]').should(
            "contain.text",
            "Your password is successfully updated!"
          );
        });
      });
    });

    describe("with invalid email", () => {
      it.skip("should display error", () => {
        forgotPasswordPage.elements.email().type("amail@mail.com");

        cy.get('[role="alert"]').should(
          "contain.text",
          "The selected email is invalid. "
        );
      });
    });

    describe("with empty email field", () => {
      it("should display error", () => {
        forgotPasswordPage.clickSetNewPassword();

        forgotPasswordPage.elements
          .emailError()
          .should("contain.text", "E-mail is required.");
      });
    });
  });
});
