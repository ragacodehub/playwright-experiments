import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { getBaseURL } from './utils/config-constants';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  testMatch: '/**/*.spec.ts',
  fullyParallel: false,
  workers: 3,
  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list'], ['allure-playwright']],

  use: {
    trace: 'on',
    actionTimeout: 30 * 1000,
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testDir: './tests/setup',
      testMatch: 'standarduser.setup.ts',
    },
    {
      name: 'standardUser',
      testDir: './tests/specs/e2e/saucedemo',
      testMatch: 'saucedemo.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/saucedemo/standarduser.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'mulitUserSetup',
      testDir: './tests/setup',
      testMatch: 'multi-user.setup.ts',
    },
    {
      name: 'saucedemo-ui-tests',
      testDir: './tests/specs/e2e/saucedemo',
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['mulitUserSetup'],
    },
    {
      name: 'api-tests',
      testDir: './tests/specs/api',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com/',
      },
    },
    {
      name: 'saucedemo-api-tests',
      testDir: './tests/specs/api/saucedemo',
      use: {
        baseURL: getBaseURL(),
      },
    },
  ],
});
