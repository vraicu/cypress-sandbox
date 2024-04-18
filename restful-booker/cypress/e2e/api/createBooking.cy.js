import _ from "lodash";

context("POST /booking", () => {
  it("should create new booking", () => {
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
      const id = response.body.bookingid;

      expect(response.status).to.eq(200);
      expect(_.omit(response.body, "bookingid")).to.deep.equal({
        booking: {
          firstname: "Jim",
          lastname: "Brown",
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01",
          },
          additionalneeds: "Breakfast",
        },
      });

      // cleanup
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
        });
      });
    });
  });
});
