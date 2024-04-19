class customersPage {
  elements = {
    searchCustomer: () => cy.get('input[placeholder="Search Customer"]'),
    deleteCustomerButton: (index) =>
      cy.get("tbody > tr").eq(index).find("td > button"),
    firstname: (index) => cy.get("tbody > tr").eq(index).find(td).eq(0),
    lastname: (index) => cy.get("tbody > tr").eq(index).find(td).eq(1),
    postcode: (index) => cy.get("tbody > tr").eq(index).find(td).eq(2),
    accountNumber: (index) => cy.get("tbody > tr").eq(index).find(td).eq(3),
  };

  deleteCustomer(index) {
    this.elements.deleteCustomerButton(index).click();
  }
}

export default new customersPage();
