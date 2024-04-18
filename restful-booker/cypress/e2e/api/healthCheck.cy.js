context("GET /ping", () => {
  describe("when the application is up an running", () => {
    it("should return 201", () => {
      cy.request(`${Cypress.config("baseUrl")}/ping`).then((response) => {
        expect(response.status).to.be.eq(201);
      });
    });
  });
});
