class navbar {
  elements = {
    signinLink: () => cy.get('[data-test="nav-sign-in"]'),
  };

  clickSignin() {
    this.elements.signinLink().click();
  }
}

export default new navbar();
