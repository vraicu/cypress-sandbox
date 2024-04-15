describe("User Form", () => {
  beforeEach(() => {
    cy.request("GET", "http://api.boozang.com/users/").then((response) => {
      for (const { id } of response.body) {
        cy.request("DELETE", `http://api.boozang.com/users/${id}`);
      }
    });
    cy.visit(`${Cypress.config("baseUrl")}/formFill`);
  });

  describe("when trying to add a user without filling the fields", () => {
    it("shouldn't allow you to submit the form", () => {
      cy.get("button.add").click();
      cy.get("button.orange").click();
      cy.get("section.show > table > tbody")
        .children()
        .should("have.length", 0);
    });
  });

  describe("when adding a new user", () => {
    beforeEach(() => {
      cy.request("POST", "http://api.boozang.com/users/", {
        firstname: "Joe",
        lastname: "Doe",
        email: "jdoe@mail.com",
        password: "johndoe",
      });
    });

    it("should append to existing user list", () => {
      cy.get('input[name="firstname"]').type("Jane");
      cy.get('input[name="lastname"]').type("Doe");
      cy.get('input[name="email"]').type("jane.doe@mail.com");
      cy.get('input[name="password"]').type("oDasd231()*D");
      cy.get("button.add").click();

      cy.get("button.orange").click();
      const users = [
        {
          name: "Jane Doe",
          email: "jane.doe@mail.com",
        },
        {
          name: "Joe Doe",
          email: "jdoe@mail.com",
        },
      ];
      for (let i = 0; i < 2; i++) {
        cy.get("section.show tbody tr")
          .eq(i)
          .find("td")
          .eq(0)
          .should("contain.text", users[i].name);
        cy.get("section.show tbody tr")
          .eq(i)
          .find("td")
          .eq(1)
          .should("contain.text", users[i].email);
      }
    });

    describe("with a password less than 6 chars", () => {
      it("should display an error", () => {
        cy.get('input[name="firstname"]').type("Jane");
        cy.get('input[name="lastname"]').type("Doe");
        cy.get('input[name="email"]').type("jane.doe@mail.com");
        cy.get('input[name="password"]').type("a");
        cy.get("button.add").click();
        cy.get("p.error").should(
          "have.text",
          "Password needs to be al least 6 characters."
        );
      });
    });
  });

  describe("when removing an user", () => {
    it("should decrease user list by one", () => {
      cy.request("POST", "http://api.boozang.com/users/", {
        firstname: "Joe",
        lastname: "Doe",
        email: "jdoe@mail.com",
        password: "johndoe",
      }).then(() => {
        cy.get("button.orange").click();
        cy.get("section.show tbody tr td button").click();
        cy.get("section.show tbody").children().should("have.length", 0);
      });
    });
  });
});
