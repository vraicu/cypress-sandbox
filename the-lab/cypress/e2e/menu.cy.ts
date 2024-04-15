describe("Menu", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  describe("when expanding it", () => {
    it("should list all sub pages", () => {
      cy.get("button.veggie_burger").click();

      cy.fixture("menu.json").then((items) => {
        cy.get("section.navbar .links > li").should("have.length", 8);
        for (let i = 0; i < 8; i++) {
          const { header, subHeaders } = items[i];
          cy.get("section.navbar .links > li h4")
            .eq(i)
            .should("contain.text", header);
          cy.get("section.navbar .links > li")
            .eq(i)
            .find("li")
            .should("have.length", subHeaders.length);
          for (let j = 0; j < subHeaders.length; j++) {
            cy.get("section.navbar .links > li")
              .eq(i)
              .find("li")
              .eq(j)
              .should("contain.text", subHeaders[j]);
          }
        }
      });
    });
  });

  describe("when clicking on a section", () => {
    it("should go to that section", () => {
      cy.get("button.veggie_burger").click();
      cy.get('[href="/speedGame"]').click();

      cy.url().should("include", "/speedGame");
      cy.get("section.intro_section h1").should("have.text", "Speed Game");
      cy.get("section.intro_section p").should("be.visible");
      cy.get('[data-testid="startBtn"]').should("be.visible");
      cy.get("section.why_learn").should("be.visible");
      cy.get("section.what_to_test").should("be.visible");
    });
  });
});
