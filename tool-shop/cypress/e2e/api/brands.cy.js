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

context("POST /brands", () => {});

context("GET /brands/{brandId}", () => {});

context("PUT /brands/{brandId}", () => {});

context("GET /brands/search", () => {});
