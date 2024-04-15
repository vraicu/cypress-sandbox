describe("Wait Game", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/waitGame`);
  });

  describe("when clicking end game after 5s", () => {
    it("should display Success", () => {
      cy.get('[data-testid="startBtn"]').click();

      cy.wait(5000);
      cy.get("button.delete").click();
      cy.get('[data-testid="message"]').should("have.text", "Success!");
      cy.get("p.sub_message").should("contain.text", "above 5 seconds.");
    });
  });

  describe("when clicking end game after 5s 1ms", () => {
    it("should display Success", () => {
      cy.get('[data-testid="startBtn"]').click();

      cy.wait(5001);
      cy.get("button.delete").click();
      cy.get('[data-testid="message"]').should("have.text", "Success!");
      cy.get("p.sub_message").should("contain.text", "above 5 seconds.");
    });
  });

  describe("when clicking end game after 4s 800ms", () => {
    it("should display Try again!", () => {
      cy.get('[data-testid="startBtn"]').click();

      cy.wait(4800);
      cy.get("button.delete").click();
      cy.get('[data-testid="message"]').should("have.text", "Try again!");
    });
  });
});
