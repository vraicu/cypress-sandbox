describe("Cat or Dog Game", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/catOrDog`);
  });

  describe("when the correct button is clicked", () => {
    it("should display Success", () => {
      cy.get("button.add").click();
      cy.get('[data-testid="output"] img')
        .invoke("attr", "alt")
        .then((animal) => {
          cy.contains("button", animal).click();
          cy.get('[data-testid="message"]').should("have.text", "Success!");
        });
    });
  });

  describe("when the wrong button is clicked", () => {
    it("should display Try again", () => {
      const switchedAnimals = {
        dog: "cat",
        cat: "dog",
      };
      cy.get("button.add").click();
      cy.get('[data-testid="output"] img')
        .invoke("attr", "alt")
        .then((animal) => {
          cy.contains("button", switchedAnimals[animal]).click();
          cy.get('[data-testid="message"]').should("have.text", "Try again!");
        });
    });
  });
});
