import { test, expect } from '@playwright/test';

//Using conditional skip
test.describe('Launch SauceDemo', () => {
  test.skip(process.env.ENV !== 'SAUCEDEMO');

  test('Navigate to Saucedemo page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Swag labs');
  });
});
