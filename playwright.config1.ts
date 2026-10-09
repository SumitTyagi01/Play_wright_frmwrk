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
  reporter: 'html',
  projects: [

    {

      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 17 Pro Max'],
      }

    },
    {

      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
        // ...devices['Moto G4']
      }

    }

  ]




});