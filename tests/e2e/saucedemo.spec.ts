import { test } from '../../fixtures/pages.fixture'
import {expect} from '@playwright/test'
import testdata from '../../test-data/ui-data.json'

test('@saucedemo Test E2E Flow', async ({page, saucedemo}) => {
  const {loginPage,cartPage} = saucedemo //Object destruction
  await page.goto('/');

  await loginPage.login(testdata.users.standard, testdata.password)
  await saucedemo.productsPage.isProductPageDisplayed()
  await saucedemo.productsPage.addToCart()
  await saucedemo.productsPage.navigateToCart()
  await cartPage.clickOnCheckout()
  await saucedemo.checkoutPage.isCheckoutPageDisplayed()
  await saucedemo.checkoutPage.fillInformationAndCheckout(testdata.checkoutInformation.firstName,
    testdata.checkoutInformation.lastname, testdata.checkoutInformation.zipcode
  )

  await expect(page.locator(saucedemo.checkoutPage.successMessage)).toContainText("Thank you for your order!")
  await page.waitForURL(/checkout-complete/)
});