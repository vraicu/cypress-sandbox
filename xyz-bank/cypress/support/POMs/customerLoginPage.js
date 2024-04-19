class customerLoginPage {
  elements = {
    customerSelect: () => cy.get("#userSelect"),
    loginButton: () => cy.get('button[type="submit"]'),
  };
}

export default new customerLoginPage();
