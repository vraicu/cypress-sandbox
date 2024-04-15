describe("Collecting Kittens Game", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/kittenCollect`);
  });

  it("should click kittens until the game is over", () => {
    cy.get("button.add").click();
    let i = 0;
    while (i < 15) {
      cy.get("div.kittens > span.kitten", { timeout: 10_000 }).click();
      i++;
    }

    cy.get('[data-testid="message"]', { timeout: 32_000 }).should(
      "contain.text",
      "Game Over!You got 15 Points!"
    );
    cy.get("header p.time").should("contain.text", "Time: 30");
    cy.get("header p.points").should("contain.text", "Points: 15");
  });

  describe("when clicking on a hedgehog", () => {
    it("should end the game with 0 points", () => {
      cy.get("button.add").click();
      cy.get("div.hedgehogs > span.hedgehog", { timeout: 10_000 }).click();
      cy.get('[data-testid="message"]', { timeout: 32_000 }).should(
        "contain.text",
        "Game Over!"
      );
      cy.get("header p.points").should("contain.text", "Points: 0");
    });
  });
});
