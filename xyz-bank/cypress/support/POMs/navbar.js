class navbar {
  elements = {
    home: () => cy.get("button.home"),
    logout: () => cy.get("button.logout"),
  };

  clickHome() {
    this.elements.home().click();
  }

  logout() {
    this.elements.logout().click();
  }
}

export default new navbar();
