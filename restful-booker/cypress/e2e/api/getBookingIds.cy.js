context("GET /booking", () => {
  before(() => {
    cy.fixture("bookings.json").then((bookings) => {
      let ids = [];
      for (const booking of bookings) {
        cy.request(
          "POST",
          `${Cypress.config("baseUrl")}/booking`,
          booking
        ).then((response) => {
          ids.push(response.body.bookingid);
        });
      }
      cy.writeFile("cypress/fixtures/ids.json", ids);
    });
  });

  describe("when filtering", () => {
    describe("by firstname", () => {
      it("should return two results", () => {
        cy.request(`${Cypress.config("baseUrl")}/booking?firstname=Jena`).then(
          (response) => {
            expect(response.status).to.be.eq(200);
            expect(response.body).to.have.length(2);
            cy.fixture("ids.json").then((ids) => {
              expect(
                response.body.map(({ bookingid }) => bookingid)
              ).to.have.deep.members(ids.slice(0, 2));
            });
          }
        );
      });
    });

    describe("by lastname", () => {
      it("should return one result", () => {
        cy.request(
          `${Cypress.config("baseUrl")}/booking?lastname=Pollock`
        ).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body).to.have.length(1);
          cy.fixture("ids.json").then((ids) => {
            expect(
              response.body.map(({ bookingid }) => bookingid)
            ).to.have.deep.members(ids.slice(0, 1));
          });
        });
      });
    });

    describe("by firstname and last name", () => {
      it("should return one result", () => {
        cy.request(
          `${Cypress.config("baseUrl")}/booking?firstname=Jena&lastname=Pollock`
        ).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body).to.have.length(1);
          cy.fixture("ids.json").then((ids) => {
            expect(
              response.body.map(({ bookingid }) => bookingid)
            ).to.have.deep.members(ids.slice(0, 1));
          });
        });
      });
    });

    describe("by checkin and checkout dates", () => {
      it("should return one result", () => {
        cy.request(
          `${Cypress.config(
            "baseUrl"
          )}/booking?checkin=2022-05-30&checkout=2022-06-03`
        ).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body).to.have.length(1);
          cy.fixture("ids.json").then((ids) => {
            expect(
              response.body.map(({ bookingid }) => bookingid)
            ).to.have.deep.members([ids[2]]);
          });
        });
      });
    });
  });

  after(() => {
    cy.fixture("account.json").then(({ username, password }) => {
      cy.request("POST", `${Cypress.config("baseUrl")}/auth`, {
        username,
        password,
      }).then((response) => {
        const { token } = response.body;
        cy.fixture("ids.json").then((ids) => {
          for (const id of ids) {
            cy.request({
              method: "DELETE",
              url: `${Cypress.config("baseUrl")}/booking/${id}`,
              headers: {
                Cookie: `token=${token}`,
              },
            });
          }
        });
      });
    });
  });
});
