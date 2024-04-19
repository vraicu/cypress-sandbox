class bankManagerLoginPage {
  elements = {
    addCustomerButton: () => cy.get('button[ng-click="addCust()"]'),
    openAccountButton: () => cy.get('button[ng-click="openAccount()"]'),
    customersButton: () => cy.get('button[ng-click="showCust()"]'),
  };

  addCustomer() {
    this.elements.addCustomerButton().click();
  }

  openAccount() {
    this.elements.openAccountButton().click();
  }

  showCustomers() {
    this.elements.customersButton().click();
  }
}

export default new bankManagerLoginPage();
