context("PATCH /booking", () => {
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
      cy.writeFile("cypress/fixtures/booking-partial-update.json", {
        id: response.body.bookingid,
      });
    });
  });

  it("should update only the booking checkin and checkout", () => {
    const updatedBooking = {
      bookingdates: {
        checkin: "2018-02-01",
        checkout: "2019-02-01",
      },
    };
    cy.fixture("booking-partial-update.json").then(({ id }) => {
      cy.fixture("account.json").then(({ username, password }) => {
        cy.request("POST", `${Cypress.config("baseUrl")}/auth`, {
          username,
          password,
        }).then((response) => {
          const { token } = response.body;
          cy.request({
            method: "PATCH",
            url: `${Cypress.config("baseUrl")}/booking/${id}`,
            body: updatedBooking,
            headers: {
              Cookie: `token=${token}`,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.eq({
              firstname: "Jim",
              lastname: "Brown",
              totalprice: 111,
              depositpaid: true,
              bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01",
              },
              additionalneeds: "Breakfast",
              ...updatedBooking,
            });
          });
        });
      });
    });
  });

  afterEach(() => {
    cy.fixture("booking-partial-update.json").then(({ id }) => {
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
