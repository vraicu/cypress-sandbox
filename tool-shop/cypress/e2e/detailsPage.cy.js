import landingPage from "../support/POMs/landingPage";
import detailsPage from "../support/POMs/detailsPage";
import navbar from "../support/POMs/navbar";
import cartPage from "../support/POMs/cartPage";

describe("Product details page", () => {
  beforeEach(() => {
    // cy.intercept("https://api.practicesoftwaretesting.com/products*", {
    //   fixture: "products.json",
    // });
    cy.visit(`${Cypress.config("baseUrl")}`);
  });

  it("should display related products", () => {
    // cy.intercept("https://api.practicesoftwaretesting.com/products/*/related", {
    //   fixture: "combinationPliers_relatedProducts.json",
    // });

    // cy.intercept("https://api.practicesoftwaretesting.com/products/*", {
    //   fixture: "combinationPliers.json",
    // });
    landingPage.clickCard(0);

    detailsPage.elements
      .relatedProductsTitle()
      .should("contain.text", "Related products");
    detailsPage.elements.relatedProductCard().should("have.length", 4);
  });

  it("should display product details", () => {
    landingPage.clickCard(0);

    cy.fixture("combinationPliers.json").then((product) => {
      detailsPage.elements.productTitle().should("contain.text", product.name);
      detailsPage.elements
        .categoryBadge()
        .should("contain.text", product.category.name);
      detailsPage.elements
        .brandBadge()
        .should("contain.text", product.brand.name);
      detailsPage.elements.price().should("have.text", product.price);
      detailsPage.elements
        .productDescription()
        .should("contain.text", product.description);
    });
  });

  describe("when adding a unit of product to cart", () => {
    it("should update the shopping cart and display a toast", () => {
      landingPage.clickCard(0);

      detailsPage.addToCart();
      cy.get("app-toasts div.toast-body").should(
        "contain.text",
        "Product added to shopping cart."
      );
      navbar.elements.cartQuantity().should("have.text", 1);
      // cleanup
      navbar.clickCart();
      cartPage.deleteProduct(0);
    });
  });

  describe("when trying to add a product to favorites", () => {
    describe("when unauthorized", () => {
      it("should display a toast saying that I am not allowed to", () => {
        landingPage.clickCard(0);
        detailsPage.addToFavorites();

        cy.get("app-toasts div.toast-body").should(
          "contain.text",
          "Unauthorized, can not add product to your favorite list."
        );
      });
    });
  });

  describe("when changing the product quantity", () => {
    afterEach(() => {
      navbar.clickCart();
      cartPage.deleteProduct(0);
    });

    describe("when trying to decrease the quantity to be less than 1", () => {
      it("should not decrease the quantity", () => {
        landingPage.clickCard(0);
        detailsPage.decreaseQuantity();

        detailsPage.addToCart();

        navbar.elements.cartQuantity().should("have.text", 1);
      });
    });

    describe("when trying to decrease the quantity for numbers greater than 1", () => {
      it("should not decrease the quantity by one", () => {
        landingPage.clickCard(0);
        detailsPage.setQuantity(2);
        detailsPage.decreaseQuantity();

        detailsPage.addToCart();

        navbar.elements.cartQuantity().should("have.text", 1);
      });
    });

    describe("when trying to increase the quantity", () => {
      it("should increase the quantity by one", () => {
        landingPage.clickCard(0);
        detailsPage.increaseQuantity();

        detailsPage.addToCart();

        navbar.elements.cartQuantity().should("have.text", 2);
      });
    });

    describe("when writing the quantity directly into the input", () => {
      it("should reflect the correct quantity in the cart", () => {
        landingPage.clickCard(0);
        detailsPage.setQuantity(10);

        detailsPage.addToCart();

        navbar.elements.cartQuantity().should("have.text", 10);
      });
    });
  });
});
