import landingPage from "../support/POMs/landingPage";
import detailsPage from "../support/POMs/detailsPage";
import navbar from "../support/POMs/navbar";
import cartPage from "../support/POMs/cartPage";
import favoritesPage from "../support/POMs/favoritesPage";

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

    describe("when authorized", () => {
      it("should add it to the user's favorites list", () => {
        cy.register();
        cy.fixture("login.json").then((user) => {
          cy.intercept(
            "https://api.practicesoftwaretesting.com/users/login"
          ).as("login");
          cy.login(user.email, user.password);
          cy.wait(["@login"]);
          navbar.clickHome();
          landingPage.clickCard(0);
          detailsPage.addToFavorites();
          navbar.clickMenu();
          navbar.clickMyFavorites();
          cy.fixture("combinationPliers.json").then((product) => {
            favoritesPage.elements
              .productTitle()
              .eq(0)
              .should("contain.text", product.name);
            favoritesPage.elements
              .productDescription()
              .eq(0)
              .should("contain.text", product.description.slice(0, 250));
          });
          favoritesPage.removeFavorite(0);
          cy.get("app-toasts div.toast-body").should(
            "contain.text",
            "Product added to your favorites list."
          );
        });
      });

      describe("when adding to favorite the same product twice", () => {
        it.only("should display a toast saying the product is already in our list", () => {
          cy.register();
          cy.fixture("login.json").then((user) => {
            cy.intercept(
              "https://api.practicesoftwaretesting.com/users/login"
            ).as("login");
            cy.login(user.email, user.password);
            cy.wait(["@login"]);
            navbar.clickHome();
            landingPage.clickCard(0);
            detailsPage.addToFavorites();
            cy.wait(3500);
            detailsPage.addToFavorites();
            navbar.clickMenu();
            navbar.clickMyFavorites();
            favoritesPage.removeFavorite(0);
            cy.get("app-toasts div.toast-body").should(
              "contain.text",
              "Product already in your favorites list."
            );
          });
        });
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
