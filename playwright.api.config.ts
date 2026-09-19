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
      name: 'api-tests',
      testDir: './tests/specs/api',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com/',
      },
    }
  ],
});
