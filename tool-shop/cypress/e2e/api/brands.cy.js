import _ from "lodash";

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
  it.skip("should create a brand", () => {
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
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
  it.skip("should get brand by id", () => {
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
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
});

context("PUT /brands/{brandId}", () => {});

context("GET /brands/search", () => {});
