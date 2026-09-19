import { expect } from '@playwright/test';
import { test } from '../../../../fixtures/rahulshetty/pages.fixture';
import orderdata from '../../../../data/rahulshetty/ui/orderdata.json';

test('Order placing @rahul', async ({ homePage, cartPage, checkoutPage }) => {
  await homePage.clickAddToCart(orderdata.productname);
  await expect(homePage.addedToCartToast).toBeVisible();
  await homePage.clickCartButton();
  for (const element of cartPage.productCardElements) {
    await expect(element).toBeVisible();
  }
  await cartPage.clickCheckout();
  await checkoutPage.enterCountryDetails(orderdata.country);
  await checkoutPage.clickPlaceOrder();
  await expect(checkoutPage.confirmationToast).toBeVisible();
  expect(await checkoutPage.getOrderConfirmationMsg()).toBe(orderdata.confirmationMsg);
});
