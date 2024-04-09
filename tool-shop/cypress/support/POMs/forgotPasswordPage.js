class forgotPasswordPage {
  elements = {
    email: () => cy.get('[data-test="email"]'),
    emailError: () => cy.get('[data-test="email-error"] > div'),
    setNewPasswordButton: () => cy.get('[data-test="forgot-password-submit"]'),
  };

  clickSetNewPassword() {
    this.elements.setNewPasswordButton().click();
  }
}

export default new forgotPasswordPage();
