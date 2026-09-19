import { expect } from '@playwright/test';
import { test } from '../../../fixtures/rahulshetty/pages.fixture';
import { getBaseURL } from '../../../utils/config-constants';
import users from '../../../data/rahulshetty/ui/users.json';

test('Login user', async ({ page, loginPage, homePage }) => {
  await page.goto(getBaseURL());
  await loginPage.login(users.standard_user.username, users.standard_user.password);
  await expect(homePage.addedToCartToast).toBeVisible();
  await page.context().storageState({
    path: '.auth/rahulshetty/user.json',
  });
});
