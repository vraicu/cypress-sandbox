class registerPage {
  elements = {
    registerButton: () => cy.get('[data-test="register-submit"]'),

    firstNameInput: () => cy.get('[data-test="first-name"]'),
    firstNameError: () => cy.get('[data-test="first-name-error"]'),

    lastNameInput: () => cy.get('[data-test="last-name"]'),
    lastNameError: () => cy.get('[data-test="last-name-error"]'),

    dobInput: () => cy.get('[data-test="dob"]'),
    dobError: () => cy.get('[data-test="dob-error"]'),

    addressInput: () => cy.get('[data-test="address"]'),
    addressError: () => cy.get('[data-test="address-error"]'),

    postcodeInput: () => cy.get('[data-test="postcode"]'),
    postcodeError: () => cy.get('[data-test="postcode-error"]'),

    cityInput: () => cy.get('[data-test="city"'),
    cityError: () => cy.get('[data-test="city-error"]'),

    stateInput: () => cy.get('[data-test="state"'),
    stateError: () => cy.get('[data-test="state-error"]'),

    countryInput: () => cy.get('[data-test="country"'),
    countryError: () => cy.get('[data-test="country-error"]'),

    phoneInput: () => cy.get('[data-test="phone"'),
    phoneError: () => cy.get('[data-test="phone-error"]'),

    emailInput: () => cy.get('[data-test="email"'),
    emailError: () => cy.get('[data-test="email-error"]'),

    passwordInput: () => cy.get('[data-test="password"'),
    passwordError: () => cy.get('[data-test="password-error"]'),

    registerError: () => cy.get('[data-test="register-error"]'),
  };

  clickRegister() {
    this.elements.registerButton().click();
  }
}

export default new registerPage();
