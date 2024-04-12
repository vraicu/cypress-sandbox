import _ from "lodash";

context("GET /products", () => {
  let brands = [];
  let categories = [];
  let images = [];
  let mightyCraftHardwareBrandId;

  before(() => {
    cy.getBrands();
    cy.fixture("brands.json").then((brandList) => {
      const { id } = brandList.find((b) => b.slug === "mightycraft-hardware");
      mightyCraftHardwareBrandId = id;
      brands = brandList;
    });
    cy.getCategories();
    cy.getImages();
    cy.fixture("categories.json").then((categoryList) => {
      categories = categoryList;
    });
    cy.fixture("images").then((imageList) => {
      images = imageList;
    });
  });

  it("gets a paginated list of products", () => {
    cy.request("GET", `${Cypress.config("apiUrl")}/products`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.current_page).to.eq(1);
        expect(response.body.data).to.have.length(9);
        expect(response.body.from).to.eq(1);
        expect(response.body.last_page).to.eq(6);
        expect(response.body.per_page).to.eq(9);
        expect(response.body.to).to.eq(9);
        expect(response.body.total).to.eq(50);
      }
    );
  });

  describe("when filtering", () => {
    describe("by brand - MightyCraft Hardware", () => {
      it("should return 2 pages with 10 results", () => {
        cy.request(
          "GET",
          `${Cypress.config(
            "apiUrl"
          )}/products?by_brand=${mightyCraftHardwareBrandId}`
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.current_page).to.eq(1);
          expect(response.body.data).to.have.length(9);
          expect(response.body.from).to.eq(1);
          expect(response.body.last_page).to.eq(2);
          expect(response.body.per_page).to.eq(9);
          expect(response.body.to).to.eq(9);
          expect(response.body.total).to.eq(10);
        });
      });

      describe("when requesting 2nd page", () => {
        it("should return 2 items", () => {
          cy.request(
            "GET",
            `${Cypress.config(
              "apiUrl"
            )}/products?by_brand=${mightyCraftHardwareBrandId}&page=2`
          ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.current_page).to.eq(2);
            expect(response.body.data).to.have.length(1);
            expect(response.body.from).to.eq(10);
            expect(response.body.last_page).to.eq(2);
            expect(response.body.per_page).to.eq(9);
            expect(response.body.to).to.eq(10);
            expect(response.body.total).to.eq(10);
          });
        });
      });
    });

    describe("by category - power tools", () => {
      it("should return 8 products", () => {
        cy.request(
          "GET",
          `${Cypress.config("apiUrl")}/products?by_category_slug=power-tools`
        ).then((response) => {
          const products = response.body.data.map((i) => {
            return {
              name: i.name,
              price: i.price,
            };
          });
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.length(8);
          expect(response.body.total).to.eq(8);
          cy.fixture("category_power_tools_products.json").then(
            (expectedProducts) => {
              expect(expectedProducts).to.have.deep.members(products);
            }
          );
        });
      });
    });

    describe("rentals", () => {
      it("should return 3 products", () => {
        cy.request(
          "GET",
          `${Cypress.config("apiUrl")}/products?is_rental=true`
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(_.omit(response.body, "data")).to.deep.equal({
            current_page: 1,
            from: 1,
            last_page: 1,
            per_page: 9,
            to: 3,
            total: 3,
          });
          expect(response.body.data).to.have.length(3);
          expect(
            response.body.data.map((e) => {
              return {
                name: e.name,
                price: e.price,
                is_rental: e.is_rental,
              };
            })
          ).to.have.deep.members([
            {
              name: "Excavator",
              price: 136.5,
              is_rental: true,
            },
            {
              name: "Bulldozer",
              price: 147.5,
              is_rental: true,
            },
            {
              name: "Crane",
              price: 153.5,
              is_rental: true,
            },
          ]);
        });
      });
    });

    describe("by price", () => {
      describe("between 15$ and 20$", () => {
        it("should return 4 products", () => {
          cy.request(
            "GET",
            `${Cypress.config("apiUrl")}/products?between=price,15,20`
          ).then((response) => {
            expect(
              response.body.data.map((e) => {
                return {
                  name: e.name,
                  price: e.price,
                };
              })
            ).to.have.deep.members([
              {
                name: "Sledgehammer",
                price: 17.75,
              },
              {
                name: "Court Hammer",
                price: 18.63,
              },
              {
                name: "Square Ruler",
                price: 15.75,
              },
              {
                name: "Ear Protection",
                price: 18.58,
              },
            ]);
          });
        });
      });

      describe("between 0$ and 1$", () => {
        it.skip("should return products between 0$ and 1$", () => {
          cy.request({
            method: "POST",
            url: `${Cypress.config("apiUrl")}/products`,
            body: {
              name: "Product $0.99",
              description: "Product $0.99",
              price: 0.99,
              category_id: categories[0].id,
              brand_id: brands[0].id,
              product_image_id: images[0].id,
              is_location_offer: false,
              is_rental: false,
            },
          });
          cy.request({
            method: "POST",
            url: `${Cypress.config("apiUrl")}/products`,
            body: {
              name: "Product $1",
              description: "Product $1",
              price: 1,
              category_id: categories[1].id,
              brand_id: brands[0].id,
              product_image_id: images[1].id,
              is_location_offer: false,
              is_rental: false,
            },
          });
          cy.request({
            method: "POST",
            url: `${Cypress.config("apiUrl")}/products`,
            body: {
              name: "Product $1.01",
              description: "Product $1.01",
              price: 1.01,
              category_id: categories[1].id,
              brand_id: brands[0].id,
              product_image_id: images[1].id,
              is_location_offer: false,
              is_rental: false,
            },
          });
          cy.request(
            "GET",
            `${Cypress.config("apiUrl")}/products?between=price,0,1`
          ).then((response) => {
            const prices = response.body.data.map((e) => e.price);
            expect(prices.filter((p) => p < 0 && p > 1)).to.have.length(0);
          });
        });
      });

      describe("between 1$ and 2$", () => {
        it.skip("should return products between 1$ and 2$", () => {
          cy.request({
            method: "POST",
            url: `${Cypress.config("apiUrl")}/products`,
            body: {
              name: "Product $1.01",
              description: "Product $1.01",
              price: 1.01,
              category_id: categories[1].id,
              brand_id: brands[0].id,
              product_image_id: images[1].id,
              is_location_offer: false,
              is_rental: false,
            },
          });
          cy.request(
            "GET",
            `${Cypress.config("apiUrl")}/products?between=price,1,2`
          ).then((response) => {
            const prices = response.body.data.map((e) => e.price);
            expect(prices.filter((p) => p < 1 && p > 2)).to.have.length(0);
          });
        });
      });
    });
  });

  describe("when sorting", () => {
    describe("by price asc", () => {
      it("should sort by price asc", () => {
        cy.request(
          "GET",
          `${Cypress.config("apiUrl")}/products?is_rental=true`
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(
            response.body.data.map((e) => {
              return {
                name: e.name,
                price: e.price,
              };
            })
          ).to.have.deep.members([
            {
              name: "Excavator",
              price: 136.5,
            },
            {
              name: "Bulldozer",
              price: 147.5,
            },
            {
              name: "Crane",
              price: 153.5,
            },
          ]);
        });
      });
    });

    describe("by price desc", () => {
      it("should sort by price desc", () => {
        cy.request(
          "GET",
          `${Cypress.config("apiUrl")}/products?is_rental=true`
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(
            response.body.data.map((e) => {
              return {
                name: e.name,
                price: e.price,
              };
            })
          ).to.have.deep.members([
            {
              name: "Crane",
              price: 153.5,
            },
            {
              name: "Bulldozer",
              price: 147.5,
            },
            {
              name: "Excavator",
              price: 136.5,
            },
          ]);
        });
      });
    });

    describe("by name asc", () => {
      it("should sort by name asc", () => {
        cy.request(
          "GET",
          `${Cypress.config("apiUrl")}/products?is_rental=true`
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(
            response.body.data.map((e) => {
              return {
                name: e.name,
                price: e.price,
              };
            })
          ).to.have.deep.members([
            {
              name: "Bulldozer",
              price: 147.5,
            },
            {
              name: "Crane",
              price: 153.5,
            },

            {
              name: "Excavator",
              price: 136.5,
            },
          ]);
        });
      });
    });

    describe("by name desc", () => {
      it("should sort by name desc", () => {
        cy.request(
          "GET",
          `${Cypress.config("apiUrl")}/products?is_rental=true`
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(
            response.body.data.map((e) => {
              return {
                name: e.name,
                price: e.price,
              };
            })
          ).to.have.deep.members([
            {
              name: "Excavator",
              price: 136.5,
            },
            {
              name: "Crane",
              price: 153.5,
            },
            {
              name: "Bulldozer",
              price: 147.5,
            },
          ]);
        });
      });
    });
  });
});

context("POST /products", () => {
  let handToolsCategory = {};
  let forgeFlexToolsBrand = {};
  let screwdriverImage = {};

  before(() => {
    cy.getCategories();
    cy.getBrands();
    cy.getImages();
    cy.fixture("categories.json").then((categories) => {
      handToolsCategory = categories.find((c) => c.slug === "hand-tools");
    });
    cy.fixture("brands.json").then((brands) => {
      forgeFlexToolsBrand = brands.find((b) => b.slug === "forgeflex-tools");
    });
    cy.fixture("images").then((images) => {
      screwdriverImage = images.find((i) => i.title === "Phillips Screwdriver");
    });
  });

  it.skip("creates a new product", () => {
    const body = {
      name: "Radon Pro flat Screwdriver",
      description: "Flat Screwdriver",
      price: 43.99,
      category_id: handToolsCategory.id,
      brand_id: forgeFlexToolsBrand.id,
      product_image_id: screwdriverImage.id,
      is_location_offer: false,
      is_rental: false,
    };
    cy.request({
      method: "POST",
      url: `${Cypress.config("apiUrl")}/products`,
      body,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(_.omit(response.body, ["id", "in_stock"])).to.deep.equal(body);
    });
  });
});

context("PUT /products", () => {
  let handToolsCategory = {};
  let forgeFlexToolsBrand = {};
  let screwdriverImage = {};
  let brands = [];
  let categories = [];
  let images = [];

  before(() => {
    cy.getCategories();
    cy.getBrands();
    cy.getImages();
    cy.fixture("categories.json").then((categoryList) => {
      handToolsCategory = categoryList.find((c) => c.slug === "hand-tools");
      categories = categoryList;
    });
    cy.fixture("brands.json").then((brandList) => {
      forgeFlexToolsBrand = brandList.find((b) => b.slug === "forgeflex-tools");
      brands = brandList;
    });
    cy.fixture("images").then((imageList) => {
      screwdriverImage = imageList.find(
        (i) => i.title === "Phillips Screwdriver"
      );
      images = imageList;
    });
  });

  it.skip("updates an existing product", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.config("apiUrl")}/products`,
      body: {
        name: "Radon Pro flat Screwdriver",
        description: "Flat Screwdriver",
        price: 43.99,
        category_id: handToolsCategory.id,
        brand_id: forgeFlexToolsBrand.id,
        product_image_id: screwdriverImage.id,
        is_location_offer: false,
        is_rental: false,
      },
    }).then((response) => {
      const updatedProduct = {
        name: "Pro flat Screwdriver",
        description: "Pro flast Screwdriver",
        price: 54.55,
        category_id: categories[2].id,
        brand_id: brands[1].id,
        product_image_id: images[0].id,
        is_location_offer: true,
        is_rental: true,
      };
      cy.request({
        method: "PUT",
        url: `${Cypress.config("apiUrl")}/products/${response.body.id}`,
        body: updatedProduct,
      }).then((response) => {
        expect(response.body).to.deep.equal({
          success: true,
        });
      });
    });
  });
});
