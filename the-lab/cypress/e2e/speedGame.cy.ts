describe("Speed Game", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/speedGame`);
  });

  describe("when you hit end game", () => {
    it("should display success", () => {
      cy.get('[data-testid="startBtn"]').click();
      cy.get("button.delete", { timeout: 15000 }).click();

      cy.get('[data-testid="message"]').should("have.text", "Success");
      cy.get("p.sub_message").should("contain.text", "Your reaction time is");
    });
  });
});
