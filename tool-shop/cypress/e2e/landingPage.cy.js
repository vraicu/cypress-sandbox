import landingPage from "../support/POMs/landingPage";
import navbar from "../support/POMs/navbar";

describe("Landing page", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  describe("when selecting other category", () => {
    beforeEach(() => {
      navbar.clickCategories();
      navbar.clickOther();
    });

    it("should have two pages of results", () => {
      cy.fixture("category_other_products.json").then((products) => {
        cy.get(".page-item .page-link").should("have.length", 4);
        const productsPerPage = [9, 8];
        for (let j = 0; j < 2; j++) {
          landingPage.elements
            .productName()
            .should("have.length", productsPerPage[j]);
          for (let i = 0; i < productsPerPage[j]; i++) {
            const { name, price } = products[9 * j + i];
            landingPage.elements
              .productName()
              .eq(i)
              .should("contain.text", name);
            landingPage.elements
              .productPrice()
              .eq(i)
              .should("contain.text", price);
          }
          cy.get(".page-item .page-link").eq(2).click();
        }
      });
    });
  });

  describe("when selecting power tools category", () => {
    beforeEach(() => {
      navbar.clickCategories();
      navbar.clickPowerTools();
      landingPage.elements.sortSelect().select("name,asc");
    });

    it("should display only power tools category filters", () => {
      const filters = [
        "Power Tools",
        "Grinder",
        "Sander",
        "Saw",
        "Drill",
        "ForgeFlex Tools",
        "MightyCraft Hardware",
      ];

      cy.get(".checkbox > label").should("have.length", 7);
      for (let i = 0; i < 7; i++) {
        cy.get(".checkbox > label").eq(i).should("contain.text", filters[i]);
      }
    });

    it("should display 8 results", () => {
      cy.get("h2").should("contain.text", "Category: Power Tools");
      const products = [
        {
          name: "Belt Sander",
          price: "$73.59",
        },
        {
          name: "Circular Saw",
          price: "$80.19",
        },
        {
          name: "Cordless Drill 12V",
          price: "$46.5",
        },
        {
          name: "Cordless Drill 18V",
          price: "$119.24",
        },
        {
          name: "Cordless Drill 20V",
          price: "$125.23",
        },
        {
          name: "Cordless Drill 24V",
          price: "$66.54",
        },
        {
          name: "Random Orbit Sander",
          price: "$100.79",
        },
        {
          name: "Sheet Sanders",
          price: "$58.48",
        },
      ];
      landingPage.elements.productName().should("have.length", 8);
      for (let i = 0; i < 8; i++) {
        const { name, price } = products[i];
        landingPage.elements.productName().eq(i).should("contain.text", name);
        landingPage.elements.productPrice().eq(i).should("contain.text", price);
      }
    });
  });

  describe("when clicking clear filters button", () => {
    it("should clear all filters", () => {
      landingPage.slidePriceRange(10);
      landingPage.elements.searchInput().type("something");
      cy.get('.checkbox [type="checkbox"]').eq(0).check();
      cy.get('.checkbox [type="checkbox"]').eq(8).check();
      cy.get('.checkbox [type="checkbox"]').eq(13).check();
      cy.get('.checkbox [type="checkbox"]').eq(19).check();
      landingPage.clickClearFiltersButton();

      // landingPage.elements
      //   .priceRangeSlider()
      //   .should("have.prop", "aria-valuenow", "100");
      landingPage.elements.searchInput().should("have.value", "");
      for (let i = 0; i < 19; i++) {
        cy.get('.checkbox [type="checkbox"]').eq(i).should("not.be.checked");
      }
    });
  });

  describe("when searching", () => {
    describe("for pliers", () => {
      it("should return 4 results", () => {
        landingPage.elements.searchInput().type("pliers");
        landingPage.clickSearch();
        cy.get(".container").find(".card").should("have.length", 4);
        for (let i = 0; i < 4; i++) {
          landingPage.elements
            .productName()
            .eq(i)
            .should("contain.text", "Pliers");
        }
      });
    });
  });

  describe("when filtering", () => {
    describe("for power tools", () => {
      it("should return 5 results", () => {
        cy.get('.checkbox [type="checkbox"]').eq(8).check();
        landingPage.elements.sortSelect().select("name,asc");

        const productNames = [
          "Belt Sander",
          "Circular Saw",
          "Cordless Drill 12V",
          "Cordless Drill 24V",
          "Sheet Sander",
        ];
        landingPage.elements.productName().should("have.length", 5);
        for (let i = 0; i < 5; i++) {
          landingPage.elements
            .productName()
            .eq(i)
            .should("contain.text", productNames[i]);
        }
      });
    });
  });

  describe("when sorting", () => {
    describe("alphabetically asc", () => {
      it("should sort results alphabetically asc", () => {
        cy.get('.checkbox [type="checkbox"]').eq(3).check();
        landingPage.elements.sortSelect().select("name,asc");

        const productNames = [
          "Adjustable Wrench",
          "Angled Spanner",
          "Open-end Spanners (Set)",
        ];
        landingPage.elements.productName().should("have.length", 3);
        for (let i = 0; i < 3; i++) {
          landingPage.elements
            .productName()
            .eq(i)
            .should("contain.text", productNames[i]);
        }
      });
    });

    describe("alphabetically desc", () => {
      it("should sort results alphabetically desc", () => {
        cy.get('.checkbox [type="checkbox"]').eq(3).check();
        landingPage.elements.sortSelect().select("name,desc");

        const productNames = [
          "Open-end Spanners (Set)",
          "Angled Spanner",
          "Adjustable Wrench",
        ];
        landingPage.elements.productName().should("have.length", 3);
        for (let i = 0; i < 3; i++) {
          landingPage.elements
            .productName()
            .eq(i)
            .should("contain.text", productNames[i]);
        }
      });
    });

    describe("by price asc", () => {
      it("should sort results by price asc", () => {
        cy.get('.checkbox [type="checkbox"]').eq(3).check();
        landingPage.elements.sortSelect().select("price,asc");

        const productNames = ["$14.14", "$20.33", "$38.51"];
        landingPage.elements.productPrice().should("have.length", 3);
        for (let i = 0; i < 3; i++) {
          landingPage.elements
            .productPrice()
            .eq(i)
            .should("contain.text", productNames[i]);
        }
      });
    });

    describe("price desc", () => {
      it("should sort results by price desc", () => {
        cy.get('.checkbox [type="checkbox"]').eq(3).check();
        landingPage.elements.sortSelect().select("price,desc");

        const productNames = ["$38.51", "$20.33", "$14.14"];
        landingPage.elements.productPrice().should("have.length", 3);
        for (let i = 0; i < 3; i++) {
          landingPage.elements
            .productPrice()
            .eq(i)
            .should("contain.text", productNames[i]);
        }
      });
    });
  });
});
