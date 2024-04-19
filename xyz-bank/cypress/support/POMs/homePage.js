class homePage {
  elements = {
    customerLoginButton: () => cy.get('button[ng-click="customer()"]'),
    bankManagerLoginButton: () => cy.get('button[ng-click="manager()"]'),
  };

  loginAsCustomer() {
    this.elements.customerLoginButton().click();
  }

  loginAsBankManager() {
    this.elements.bankManagerLoginButton().click();
  }
}

export default new homePage();
