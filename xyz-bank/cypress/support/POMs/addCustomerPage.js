class addCustomerPage {
  elements = {
    firstname: () => cy.get('input[placeholder="First Name"]'),
    lastname: () => cy.get('input[placeholder="Last Name"]'),
    postcode: () => cy.get('input[placeholder="Post Code"]'),
    addCustomerButton: () =>
      cy.get('form[ng-submit="addCustomer()"] > button[type="submit"]'),
  };

  addCustomer() {
    this.elements.addCustomerButton().click();
  }

  setFirstname(firstname) {
    this.elements.firstname().type(firstname);
  }

  setLastname(lastname) {
    this.elements.lastname().type(lastname);
  }

  setPostcode(postcode) {
    this.elements.postcode().type(postcode);
  }
}

export default new addCustomerPage();
