// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:

import '@shelex/cypress-allure-plugin';
import './commands';

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const specName = Cypress.spec.name.replace(/.*[\/\\]/, '');
    const screenshotFileName = `${runnable.parent} -- ${test.title} (failed).png`;
    const screenshotPath = `cypress/screenshots/${specName}/${screenshotFileName}`;

    // ✅ แนบ Screenshot แบบ base64 เข้า Allure Report
    cy.task('readFileMaybe', screenshotPath, 'base64').then((imgData) => {
      if (imgData) {
        const buffer = Buffer.from(imgData, 'base64');
        const allure = Cypress.Allure.reporter.getInterface();
        allure.attachment('Failure Screenshot', buffer, 'image/png');
      }
    });
  }
});
