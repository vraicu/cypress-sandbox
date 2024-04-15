describe("Concatenate Strings", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/concatStrings`);
  });

  describe("when typing an incorrect string", () => {
    it("should display try again", () => {
      cy.get('input[name="strings"]').type("somethings");
      cy.get("form button.add").click();
      cy.get('[data-testid="message"]').should("contain.text", "Try again!");
    });
  });

  describe("when typing the concatenated string", () => {
    it("should display success", () => {
      cy.get("section.strings_section > button.add").click();
      cy.get("p.string1")
        .invoke("text")
        .then((string1) => {
          cy.get("p.string2")
            .invoke("text")
            .then((string2) => {
              cy.get('input[name="strings"]').type(`${string1}${string2}`);
              cy.get("form button.add").click();
              cy.get('[data-testid="message"]').should(
                "contain.text",
                "Success!"
              );
            });
        });
    });
  });
});
