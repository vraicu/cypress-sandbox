class signinPage {
  elements = {
    registerAccountLink: () => cy.get('[data-test="register-link"]'),
    forgotYourPasswordLink: () => cy.get('[data-test="forgot-password-link"]'),
    loginError: () => cy.get('[data-test="login-error"]'),
    loginButton: () => cy.get('[data-test="login-submit"]'),
    email: () => cy.get('[data-test="email"]'),
    password: () => cy.get('[data-test="password"]'),
    signInWithGoogleButton: () => cy.get("button .google-sign-in-button"),
    emailError: () => cy.get('[data-test="email-error"] > div'),
    passwordError: () => cy.get('[data-test="password-error"] > div'),
  };

  clickRegisterAccount() {
    this.elements.registerAccountLink().click();
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  clickForgotYourPassword() {
    this.elements.forgotYourPasswordLink().click();
  }
}

export default new signinPage();
