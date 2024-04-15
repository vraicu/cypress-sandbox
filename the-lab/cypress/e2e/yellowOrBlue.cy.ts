describe("Yellow or Blue Game", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/yellowOrBlue`);
  });

  describe("when the correct color button is clicked ", () => {
    it("should display Success", () => {
      cy.get("button.add").click();
      cy.get("h5.color")
        .invoke("text")
        .then((color) => {
          cy.get(`button.${color}`).click();
          cy.get('[data-testid="message"]').should("have.text", "Success!");
        });
    });
  });

  describe("when the wrong color button is clicked ", () => {
    it("should display Try again", () => {
      const switchedColors = {
        yellow: "blue",
        blue: "yellow",
      };
      cy.get("button.add").click();
      cy.get("h5.color")
        .invoke("text")
        .then((color) => {
          cy.get(`button.${switchedColors[color]}`).click();
          cy.get('[data-testid="message"]').should("have.text", "Try again!");
        });
    });
  });
});
