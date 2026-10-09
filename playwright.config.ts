// @ts-check
import { defineConfig } from '@playwright/test';
const { getTestAccountNames } = require('./utils/test-credentials.js');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 40000,
  expect: {
    timeout: 12 * 1000,
  },
  reporter: [
    ['html'],
    ['allure-playwright'],
  ],


  projects: getTestAccountNames().map(name => ({
    name,
    use: {
      browserName: 'chromium',
      headless: Boolean(process.env.CI),
      screenshot: 'on',
      trace: 'on',
    },
  })),
});