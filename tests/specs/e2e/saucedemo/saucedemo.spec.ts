import { test, expect } from '@playwright/test';
import { test as pageobjectTest } from '../../../../fixtures/saucedemo/pages.fixture';
import testdata from '../../../../data/saucedemo/ui/ui-data.json';
import { mockAPI } from '../../../../utils/booking-api';

pageobjectTest(
  '@saucedemo Validate order placed',
  async ({ page, loginPage, productsPage, cartPage, checkoutPage }) => {
    await loginPage.navigateToProductsPage();
    await productsPage.addToCart(
      testdata.users.standard,
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
    await page.waitForURL(/checkout-complete/);
  }
);

//Mocking Response
pageobjectTest(
  '@mocking Validate API Mock response for standard user',
  async ({ page, loginPage }) => {
    await mockAPI(page);
    await loginPage.login(testdata.users.standard, testdata.password);
    const response = await page.waitForResponse('/inventory.html');
    expect(response.status).toBe(500);
  }
);

//Visual Regression
test('@visual Visual Regression', async ({ page }) => {
  await page.goto('https://www.linkedin.com');
  await expect(page).toHaveScreenshot();
});
