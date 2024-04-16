class cartPage {
  elements = {
    deleteProductButton: () => cy.get("a.btn-danger"),
  };

  deleteProduct(index) {
    this.elements.deleteProductButton().eq(index).click();
  }
}

export default new cartPage();
