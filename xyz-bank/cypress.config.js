const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.globalsqa.com/angularJs-protractor/BankingProject",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
