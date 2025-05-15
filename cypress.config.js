const { defineConfig } = require('cypress');
const fs = require('fs');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      allureWriter(on, config);

      // ✅ Task สำหรับอ่านไฟล์ screenshot เพื่อแนบเข้า Allure
      on('task', {
        readFileMaybe(filePath, encoding) {
          if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, encoding);
          }
          return null;
        }
      });

      return config;
    }
  }
});
