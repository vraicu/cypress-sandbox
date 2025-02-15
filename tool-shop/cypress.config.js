const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://practicesoftwaretesting.com",
    apiUrl: "https://api.practicesoftwaretesting.com",
    excludeSpecPattern: "cypress/e2e/api/*",
  },
});
