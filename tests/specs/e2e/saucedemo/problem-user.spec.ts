import { expect } from '@playwright/test';
import { test } from '../../../../fixtures/saucedemo/pages.fixture';
import testdata from '../../../../data/saucedemo/ui/ui-data.json';

test.use({ userName: 'problem' });

test('@problem Validate problem user test', async ({ loginPage, productsPage }) => {
  await loginPage.navigateToProductsPage();
  const isEnabled = await productsPage.addToCart(
    testdata.users.problem,
    testdata.productName.problem_user_product
  );
  expect(isEnabled).toBeFalsy();
});
