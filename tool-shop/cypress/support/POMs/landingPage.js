class landingPage {
  elements = {
    priceRangeSlider: () => cy.get('ngx-slider [aria-label="ngx-slider-max"]'),
    productPrice: () => cy.get('[data-test="product-price"]'),
    productName: () => cy.get('[data-test="product-name"]'),
    searchInput: () => cy.get('[data-test="search-query"]'),
    searchButton: () => cy.get('[data-test="search-submit"]'),
    clearFiltersButton: () => cy.get('[data-test="search-reset"]'),
    sortSelect: () => cy.get('[data-test="sort"]'),
    productCard: () => cy.get("a.card"),
  };

  slidePriceRange(units) {
    for (let i = 0; i < units; i++) {
      this.elements.priceRangeSlider().type("{leftArrow}");
    }
  }

  clickSearch() {
    this.elements.searchButton().click();
  }

  clickClearFiltersButton() {
    this.elements.clearFiltersButton().click();
  }

  clickCard(index) {
    this.elements.productCard().eq(index).click();
  }
}

export default new landingPage();
