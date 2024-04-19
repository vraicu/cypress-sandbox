class customerPage {
  elements = {
    username: () => cy.get("strong span"),
    accountSelect: () => cy.get("#accountSelect"),
    accountNumber: () => cy.get("div.center strong").eq(0),
    balance: () => cy.get("div.center strong").eq(1),
    currency: () => cy.get("div.center strong").eq(2),
    transactionsButton: () => cy.get('button[ng-click="transactions()"]'),
    depositButton: () => cy.get('button[ng-click="deposit()"]'),
    depositAmount: () =>
      cy.get('form[ng-submit="deposit()"] input[placeholder="amount"]'),
    submitDepositButton: () =>
      cy.get('form[ng-submit="deposit()"] > button[type="submit"]'),
    withdrawlButton: () => cy.get('button[ng-click="withdrawl()"]'),
    withdrawlInput: () =>
      cy.get('form[ng-submit="withdrawl()"] input[placeholder="amount"]'),
    submitWithdrawlButton: () =>
      cy.get('form[ng-submit="withdrawl()"] > button[type="submit"]'),
    errorMessage: () => cy.get("span.error"),
  };

  showTransactions() {
    this.elements.transactionsButton().click();
  }

  makeADeposit(amount) {
    this.elements.depositButton().click();
    this.elements.depositAmount().type(amount);
    this.elements.submitDepositButton().click();
  }

  makeAWithdral(amount) {
    this.elements.withdrawlButton().click();
    this.elements.withdrawlInput().type(amount);
    this.elements.submitWithdrawlButton().click();
  }
}

export default new customerPage();
