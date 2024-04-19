class transactionsPage {
  elements = {
    startDateFilter: () => cy.get("#start"),
    endDateFilter: () => cy.get("#end"),
    backButton: () => cy.get('button[ng-click="back()"]'),
    resetButton: () => cy.get('button[ng-click="reset()"]'),
    scrollLeftButton: () => cy.get('button[ng-click="scrollLeft()"]'),
    scrollRightButton: () => cy.get('button[ng-click="scrollRight()"]'),
    scrollTopButton: () => cy.get('button[ng-click="scrollTop()"]'),
    dateTime: (index) => cy.get("tbody tr").eq(index).find("td").eq(0),
    amount: (index) => cy.get("tbody tr").eq(index).find("td").eq(1),
    transactionType: (index) => cy.get("tbody tr").eq(index).find("td").eq(2),
  };

  setStartDate(date) {
    this.elements.startDateFilter().type(date);
  }

  setEndDate(date) {
    this.elements.endDateFilter().type(date);
  }

  goBack() {
    this.elements.backButton().click();
  }

  resetFilters() {
    this.elements.resetButton().click();
  }

  scrollToTop() {
    this.elements.scrollTopButton().click();
  }

  scrollLeft() {
    this.elements.scrollLeftButton().click();
  }

  scrollRight() {
    this.elements.scrollRightButton().click();
  }
}

export default new transactionsPage();
