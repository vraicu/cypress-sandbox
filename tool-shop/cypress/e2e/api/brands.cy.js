import _ from "lodash";
import { generateId } from "../../support/utils";

context("GET /brands", () => {
  let brands = [];

  before(() => {
    cy.fixture("brands.json").then((brandList) => {
      brands = brandList;
    });
  });

  it("should return all brands", () => {
    cy.request("GET", `${Cypress.config("apiUrl")}/brands`).then((response) => {
      const brandList = response.body.map((b) => {
        return {
          name: b.name,
          slug: b.slug,
        };
      });
      expect(brandList).to.have.deep.members(
        brands.map((b) => {
          return {
            name: b.name,
            slug: b.slug,
          };
        })
      );
    });
  });
});

context("POST /brands", () => {
  it("should create a brand", () => {
    const id = generateId();
    const brand = {
      name: `Brand ${id}`,
      slug: `brand-${id}`,
    };
    cy.request("POST", `${Cypress.config("apiUrl")}/brands`, brand).then(
      (response) => {
        expect(_.omit(response.body, "id")).to.deep.equal(brand);
      }
    );
  });
});

context("GET /brands/{brandId}", () => {
  it("should get brand by id", () => {
    const id = generateId();
    const brand = {
      name: `Brand ${id}`,
      slug: `brand-${id}`,
    };
    cy.request("POST", `${Cypress.config("apiUrl")}/brands`, brand).then(
      (response) => {
        const newBrand = response.body;
        cy.request(
          "GET",
          `${Cypress.config("apiUrl")}/brands/${newBrand.id}`
        ).then((response) => {
          expect(response.body).to.have.deep.equal(newBrand);
        });
      }
    );
  });

  describe("when duplicate slug", () => {
    it("should return error", () => {
      cy.request({
        failOnStatusCode: false,
        method: "POST",
        url: `${Cypress.config("apiUrl")}/brands`,
        body: {
          name: "ForgeFlex Tools",
          slug: "forgeflex-tools",
        },
      }).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.deep.equal({
          slug: ["A brand already exists with this slug."],
        });
      });
    });
  });
});

context("PUT /brands/{brandId}", () => {
  it("should update brand", () => {
    const id = generateId();
    const brand = {
      name: `Brand ${id}`,
      slug: `brand-${id}`,
    };
    cy.request("POST", `${Cypress.config("apiUrl")}/brands`, brand).then(
      (response) => {
        const newBrand = response.body;
        const id = generateId();
        const updatedBrand = {
          name: `Mighty Brand ${id}`,
          slug: `mighty-brand-${id}`,
        };
        cy.request(
          "PUT",
          `${Cypress.config("apiUrl")}/brands/${newBrand.id}`,
          updatedBrand
        ).then((response) => {
          expect(response.body).to.have.deep.equal({
            success: true,
          });
        });
      }
    );
  });

  describe("when slug duplicate", () => {
    it("should return error", () => {
      const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      const brand = {
        name: `Brand ${id}`,
        slug: `brand-${id}`,
      };
      cy.request("POST", `${Cypress.config("apiUrl")}/brands`, brand).then(
        (response) => {
          const newBrand = response.body;
          const updatedBrand = {
            name: "ForgeFlex Tools",
            slug: "forgeflex-tools",
          };
          cy.request({
            failOnStatusCode: false,
            method: "PUT",
            url: `${Cypress.config("apiUrl")}/brands/${newBrand.id}`,
            body: updatedBrand,
          }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.deep.equal({
              message: "Duplicate Entry",
            });
          });
        }
      );
    });
  });
});

context("GET /brands/search", () => {
  describe("when search term matches brands", () => {
    it("should return brand(s)", () => {
      cy.request("GET", `${Cypress.config("apiUrl")}/brands?q=ForgeFlex`).then(
        (response) => {
          expect(response.body.length).to.be.gt(0);
        }
      );
    });
  });
});
