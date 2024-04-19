class openAccountPage {
  elements = {
    customerSelect: () => cy.get("#userSelect"),
    currencySelect: () => cy.get("#currency"),
    processButton: () =>
      cy.get('form[submit="process()"] > button[type="submit"]'),
  };

  submitAccount() {
    this.elements.processButton().click();
  }
}

export default new openAccountPage();
