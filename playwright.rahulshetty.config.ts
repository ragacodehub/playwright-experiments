import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  testMatch: '/**/*.spec.ts',
  fullyParallel: true,
  workers: process.env.CI ? 1 : 1,
  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  retries: process.env.CI ? 2 : 0,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    actionTimeout: 30 * 1000,
  },

  projects: [
    {
      name: 'setup',
      testDir: './tests/setup/rahulshetty',
      testMatch: '*.setup.ts',
    },
    {
      name: 'rahulshetty_ui_tests',
      testDir: './tests/specs/e2e/rahulshetty',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/rahulshetty/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
