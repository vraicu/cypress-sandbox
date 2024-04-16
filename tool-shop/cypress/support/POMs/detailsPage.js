class detailsPage {
  elements = {
    relatedProductCard: () => cy.get("a.card"),
    productTitle: () => cy.get("h1").eq(0),
    relatedProductsTitle: () => cy.get("h1").eq(1),
    addToCartButton: () => cy.get('[data-test="add-to-cart"]'),
    addToFavoritesButton: () => cy.get('[data-test="add-to-favorites"]'),
    quantityInput: () => cy.get('[data-test="quantity"]'),
    increaseQuantityButton: () => cy.get('[data-test="increase-quantity"]'),
    decreaseQuantityButton: () => cy.get('[data-test="decrease-quantity"]'),
    categoryBadge: () => cy.get("p span.badge").eq(0),
    brandBadge: () => cy.get("p span.badge").eq(1),
    price: () => cy.get('[data-test="unit-price"]'),
    productDescription: () => cy.get('[data-test="product-description"]'),
  };

  addToFavorites() {
    this.elements.addToFavoritesButton().click();
  }

  addToCart() {
    this.elements.addToCartButton().click();
  }

  increaseQuantity() {
    this.elements.increaseQuantityButton().click();
  }

  decreaseQuantity() {
    this.elements.decreaseQuantityButton().click();
  }

  setQuantity(quantity) {
    this.elements.quantityInput().clear();
    this.elements.quantityInput().type(quantity);
  }
}

export default new detailsPage();
