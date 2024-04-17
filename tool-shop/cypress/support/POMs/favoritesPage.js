class favoritesPage {
  elements = {
    productTitle: () => cy.get('[data-test="product-name"]'),
    productDescription: () => cy.get('[data-test="product-description"]'),
    deleteButton: () => cy.get('[data-test="delete"]'),
  };

  removeFavorite(index) {
    this.elements.deleteButton().eq(index).click();
  }
}

export default new favoritesPage();
