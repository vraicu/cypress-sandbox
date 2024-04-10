class navbar {
  elements = {
    signinLink: () => cy.get('[data-test="nav-sign-in"]'),
    menu: () => cy.get('[data-test="nav-menu"]'),
    cart: () => cy.get('[data-test="nav-cart"]'),
    cartQuantity: () => cy.get('[data-test="cart-quantity"]'),
    categories: () => cy.get('[data-test="nav-categories"]'),
    handTools: () => cy.get('[data-test="nav-hand-tools"]'),
    powerTools: () => cy.get('[data-test="nav-power-tools"]'),
    other: () => cy.get('[data-test="nav-other"]'),
    specialTools: () => cy.get('[data-test="nav-special-tools"]'),
    rentals: () => cy.get('[data-test="nav-rentals"]'),
  };

  clickSignin() {
    this.elements.signinLink().click();
  }

  clickCart() {
    this.elements.cart().click();
  }

  clickCategories() {
    this.elements.categories().click();
  }

  clickHandTools() {
    this.elements.handTools().click();
  }

  clickPowerTools() {
    this.elements.powerTools().click();
  }

  clickOther() {
    this.elements.other().click();
  }

  clickSpecialTools() {
    this.elements.specialTools().click();
  }

  clickRentals() {
    this.elements.rentals().click();
  }
}

export default new navbar();
