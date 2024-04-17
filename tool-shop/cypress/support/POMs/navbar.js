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
    home: () => cy.get('[data-test="nav-home"]'),
    menu: () => cy.get("#menu"),
    myAccount: () => cy.get('[data-test="nav-my-account"]'),
    myFavorites: () => cy.get('[data-test="nav-my-favorites"]'),
    myProfile: () => cy.get('[data-test="nav-my-profile"]'),
    myInvoices: () => cy.get('[data-test="nav-my-invoices"]'),
    myMessages: () => cy.get('[data-test="nav-my-messages"]'),
  };

  clickMenu() {
    this.elements.menu().click();
  }

  clickMyFavorites() {
    this.elements.myFavorites().click();
  }

  clickHome() {
    this.elements.home().click();
  }

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
