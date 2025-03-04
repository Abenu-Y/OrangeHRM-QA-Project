const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  // reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    // reportFilename: "[status]_[name]_[datetime]",
    charts:true,
    overwrite: false,
    // html: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
    embeddedScreenshots: true
  },
  e2e: {
    projectId: "422qnn",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // require('cypress-mochawesome-reporter/plugin')(on);
    },
  retries: {
      runMode: 2,   // Retries failed tests 2 times in CLI mode
      openMode: 1    // Retries failed tests 1 time in Cypress GUI mode
    } ,
  env: {
      validUsername: "Admin",
      validPassword: "admin123",
      invalidPassword: "wrongpass"
    }  
  },
});
