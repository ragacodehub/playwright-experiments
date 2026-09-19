import { test as base } from '@playwright/test';
import HomePage from '../../pages/rahulshetty/home.page';
import LoginPage from '../../pages/rahulshetty/login.page';
import { getBaseURL } from '../../utils/config-constants';
import CartPage from '../../pages/rahulshetty/cart.page';
import CheckoutPage from '../../pages/rahulshetty/checkout.page';

type Pages = {
  loginPage: LoginPage;
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await page.goto(getBaseURL());
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});
