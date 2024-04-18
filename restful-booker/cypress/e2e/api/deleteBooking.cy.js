context("DELETE /booking", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.config("baseUrl")}/booking`, {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    }).then((response) => {
      cy.writeFile("cypress/fixtures/booking-delete.json", {
        id: response.body.bookingid,
      });
    });
  });

  it("should delete booking", () => {
    cy.fixture("booking-delete.json").then(({ id }) => {
      cy.fixture("account.json").then(({ username, password }) => {
        cy.request("POST", `${Cypress.config("baseUrl")}/auth`, {
          username,
          password,
        }).then((response) => {
          const { token } = response.body;
          cy.request({
            method: "DELETE",
            url: `${Cypress.config("baseUrl")}/booking/${id}`,
            headers: {
              Cookie: `token=${token}`,
            },
          });
          cy.request({
            method: "GET",
            url: `${Cypress.config("baseUrl")}/booking/${id}`,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(404);
          });
        });
      });
    });
  });
});
