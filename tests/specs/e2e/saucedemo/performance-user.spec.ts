import { expect } from '@playwright/test';
import { test } from '../../../../fixtures/saucedemo/pages.fixture';
import testdata from '../../../../data/saucedemo/ui/ui-data.json';

test.use({ userName: 'performance' });

test('@performance Validate performace user test', async ({
  injectSession,
  loginPage,
  cartPage,
  checkoutPage,
  productsPage,
}) => {
  await loginPage.navigateToProductsPage();
  await productsPage.addToCart(
    testdata.users.performance,
    testdata.productName.standard_user_product
  );
  await productsPage.navigateToCart();
  await cartPage.clickCheckoutButton();
  await checkoutPage.fillInformationAndCheckout(
    testdata.checkoutInformation.firstName,
    testdata.checkoutInformation.lastname,
    testdata.checkoutInformation.zipcode
  );
  await expect(checkoutPage.successMessage).toContainText(testdata.successMessage);
  await injectSession.waitForURL(/checkout-complete/);
});
