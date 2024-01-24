import { defineConfig } from 'cypress';

const path = require('path');
require('dotenv').config({ path: path.resolve('', '.env') });
const notificationConfiguration = {
  'authentication-desktop.cy.ts': '#cypress-results',
};
const notifyWhen = {
  whenRecordingOnDashboard: true,
  whenRecordingDashboardTag: ['notify'],
};

export default defineConfig({
  reporter: 'mochawesome',
  screenshotsFolder: 'cypress/mochawesome-report/screenshots',
  videosFolder: 'cypress/mochawesome-report/videos',
  reporterOptions: {
    useInlineDiffs: true,
    embeddedScreenshots: true,
    reportDir: 'cypress/results/mochawesome',
    reportFilename: '[name].html',
    overwrite: true,
    html: true,
    json: true,
  },
  env: {
    LOGIN: process.env.CYPRESS_USERNAME,
    PASSWORD: process.env.CYPRESS_PASSWORD,
    LOCKED_USER: process.env.CYPRESS_LOCKER_USER,
    PROBLEM_USER: process.env.CYPRESS_PROBLEM_USER,
    GLITCH_USER: process.env.CYPRESS_PERFORMANCE_GLITCH_USER,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      require('cypress-slack-notify')(
        on,
        notificationConfiguration,
        notifyWhen,
      );
      // implement node event listeners here
    },
  },
});
