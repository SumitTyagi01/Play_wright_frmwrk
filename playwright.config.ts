// @ts-check
import { defineConfig, devices } from '@playwright/test';


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


  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
  },


});