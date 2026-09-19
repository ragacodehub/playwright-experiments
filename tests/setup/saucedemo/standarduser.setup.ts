import { expect } from '@playwright/test';
import { test as setup } from '../../../fixtures/saucedemo/pages.fixture';
import { getBaseURL } from '../../../utils/config-constants';
import testdata from '../../../data/saucedemo/ui/ui-data.json';

setup('Standard User Authentication Setup', async ({ page, loginPage }) => {
  await page.goto(getBaseURL());
  await loginPage.login(testdata.users.standard, testdata.password);
  await expect(page).toHaveURL(/inventory.html/);
  await page.context().storageState({ path: '.auth/saucedemo/standarduser.json' });
});
