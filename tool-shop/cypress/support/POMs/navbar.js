class navbar {
  elements = {
    signinLink: () => cy.get('[data-test="nav-sign-in"]'),
    menu: () => cy.get('[data-test="nav-menu"]'),
  };

  clickSignin() {
    this.elements.signinLink().click();
  }
}

export default new navbar();
