import navbar from "../support/POMs/navbar";
import registerPage from "../support/POMs/registerPage";
import signinPage from "../support/POMs/signinPage";
import { generateId } from "../support/utils";

describe("Register form", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    navbar.clickSignin();
    signinPage.clickRegisterAccount();
  });

  const fields = [
    {
      input: registerPage.elements.firstNameInput,
      error: registerPage.elements.firstNameError,
      value: "John",
      errorMessage: "First name is required.",
      name: "First name",
    },
    {
      input: registerPage.elements.lastNameInput,
      error: registerPage.elements.lastNameError,
      value: "Doe",
      errorMessage: "Last name is required.",
      name: "Last name",
    },
    {
      input: registerPage.elements.dobInput,
      error: registerPage.elements.dobError,
      value: "1990-01-01",
      errorMessage: "Date of Birth is required.",
      name: "Date of Birth",
    },
    {
      input: registerPage.elements.addressInput,
      error: registerPage.elements.addressError,
      value: "Middle of nowhere",
      errorMessage: "Address is required.",
      name: "Address",
    },
    {
      input: registerPage.elements.postcodeInput,
      error: registerPage.elements.postcodeError,
      value: "12345",
      errorMessage: "Postcode is required.",
      name: "Postcode",
    },
    {
      input: registerPage.elements.cityInput,
      error: registerPage.elements.cityError,
      value: "Calgary",
      errorMessage: "City is required.",
      name: "City",
    },
    {
      input: registerPage.elements.stateInput,
      error: registerPage.elements.stateError,
      value: "Alberta",
      errorMessage: "State is required.",
      name: "State",
    },
    {
      input: registerPage.elements.countryInput,
      error: registerPage.elements.countryError,
      value: "CA",
      isSelect: true,
      errorMessage: "Country is required.",
      name: "Country",
    },
    {
      input: registerPage.elements.phoneInput,
      error: registerPage.elements.phoneError,
      value: "900909283",
      errorMessage: "Phone is required.",
      name: "Phone",
    },
    {
      input: registerPage.elements.emailInput,
      error: registerPage.elements.emailError,
      value: "jdoe@mail.com",
      errorMessage: "E-mail is required.",
      name: "E-mail",
    },
    {
      input: registerPage.elements.passwordInput,
      error: registerPage.elements.passwordError,
      value: "JohnD@3!",
      errorMessage: "Password is required.",
      name: "Password",
    },
  ];

  describe("with empty fields", () => {
    it("should trigger validation when register clicked", () => {
      registerPage.clickRegister();
      for (const { error, errorMessage } of fields) {
        error().should("contain.text", errorMessage);
      }
    });
  });

  describe("with partial empty fields", () => {
    for (const field of fields) {
      it.skip(`should require ${field.name} when register clicked`, () => {
        for (const innerField of fields) {
          if (innerField.name === field.name) {
            continue;
          }
          if (innerField.isSelect) {
            innerField.input().select(innerField.value);
          } else {
            innerField.input().type(innerField.value);
          }
        }

        registerPage.clickRegister();

        field.error().should("contain.text", field.errorMessage);
      });
    }
  });

  describe("with password field", () => {
    describe("under 6 chars", () => {
      it("should display error", () => {
        registerPage.elements.passwordInput().type("12345");

        registerPage.clickRegister();

        registerPage.elements
          .passwordError()
          .should(
            "contain.text",
            "Password must be minimal 6 characters long. "
          );
      });
    });

    describe("under 8 chars", () => {
      it("should display error", () => {
        for (const field of fields) {
          if (field.name == "Password") {
            field.input().type("ABCde1*");
            continue;
          }
          if (field.isSelect) {
            field.input().select(field.value);
          } else {
            field.input().type(field.value);
          }
        }

        registerPage.clickRegister();

        registerPage.elements
          .registerError()
          .should(
            "contain.text",
            "The password field must be at least 8 characters."
          );
      });
    });

    describe("without a digit", () => {
      it("should display error", () => {
        for (const field of fields) {
          if (field.name == "Password") {
            field.input().type("ABCdefg*");
            continue;
          }
          if (field.isSelect) {
            field.input().select(field.value);
          } else {
            field.input().type(field.value);
          }
        }

        registerPage.clickRegister();

        registerPage.elements
          .registerError()
          .should(
            "contain.text",
            "The password field must contain at least one number."
          );
      });
    });

    describe("without a symbol", () => {
      it("should display error", () => {
        for (const field of fields) {
          if (field.name == "Password") {
            field.input().type("ABCdefg1");
            continue;
          }
          if (field.isSelect) {
            field.input().select(field.value);
          } else {
            field.input().type(field.value);
          }
        }

        registerPage.clickRegister();

        registerPage.elements
          .registerError()
          .should(
            "contain.text",
            "The password field must contain at least one symbol."
          );
      });
    });

    describe("without uppercase chars", () => {
      it("should display error", () => {
        for (const field of fields) {
          if (field.name == "Password") {
            field.input().type("abcdef*1");
            continue;
          }
          if (field.isSelect) {
            field.input().select(field.value);
          } else {
            field.input().type(field.value);
          }
        }

        registerPage.clickRegister();

        registerPage.elements
          .registerError()
          .should(
            "contain.text",
            "The password field must contain at least one uppercase and one lowercase letter."
          );
      });
    });

    describe("without chars", () => {
      it("should display error", () => {
        for (const field of fields) {
          if (field.name == "Password") {
            field.input().type("1234567*");
            continue;
          }
          if (field.isSelect) {
            field.input().select(field.value);
          } else {
            field.input().type(field.value);
          }
        }

        registerPage.clickRegister();

        registerPage.elements
          .registerError()
          .should(
            "contain.text",
            "The password field must contain at least one uppercase and one lowercase letter."
          );
      });
    });
  });

  describe("with phone field", () => {
    describe("with chars other than numbers", () => {
      it("should display error", () => {
        registerPage.elements.phoneInput().type(")(*&^GHJ(*))");

        registerPage.clickRegister();

        registerPage.elements
          .phoneError()
          .should("contain.text", "Only numbers are allowed. ");
      });
    });
  });

  describe("with invalid email", () => {
    it("should display error", () => {
      registerPage.elements.emailInput().type("someemail");

      registerPage.clickRegister();

      registerPage.elements.emailError().should("contain.text", "");
    });
  });

  describe("with a duplicate email", () => {
    it("should display error", () => {
      cy.register("jdoe@mail.com");
      for (const field of fields) {
        if (field.isSelect) {
          field.input().select(field.value);
        } else {
          field.input().type(field.value);
        }
      }

      registerPage.clickRegister();

      registerPage.elements
        .registerError()
        .should(
          "have.text",
          "A customer with this email address already exists."
        );
    });
  });

  describe("with valid inputs", () => {
    it("should create account", () => {
      for (const field of fields) {
        if (field.name == "E-mail") {
          field.input().type(`jdoe${generateId()}@email.com`);
          continue;
        }
        if (field.isSelect) {
          field.input().select(field.value);
        } else {
          field.input().type(field.value);
        }
      }

      registerPage.clickRegister();

      cy.url().should("include", "/auth/login");
    });
  });
});
