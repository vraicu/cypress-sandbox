class customerLoginPage {
  elements = {
    customerSelect: () => cy.get("#userSelect"),
    loginButton: () => cy.get('button[type="submit"]'),
  };

  login() {
    this.elements.loginButton().click();
  }
}

export default new customerLoginPage();
