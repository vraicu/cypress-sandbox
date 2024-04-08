class signinPage {
  elements = {
    registerAccountLink: () => cy.get('[data-test="register-link"]'),
  };

  clickRegisterAccount() {
    this.elements.registerAccountLink().click();
  }
}

export default new signinPage();
