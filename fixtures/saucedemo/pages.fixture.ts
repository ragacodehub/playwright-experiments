import LoginPage from '../../pages/saucedemo/login.page';
import ProductsPage from '../../pages/saucedemo/products.page';
import CartPage from '../../pages/saucedemo/cart.page';
import CheckoutPage from '../../pages/saucedemo/checkout.page';
import { storageSession } from './multi-user.fixture';

export type saucedemoPages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = storageSession.extend<saucedemoPages>({
  loginPage: async ({ injectSession }, use) => {
    await use(new LoginPage(injectSession));
  },
  productsPage: async ({ injectSession }, use) => {
    await use(new ProductsPage(injectSession));
  },
  cartPage: async ({ injectSession }, use) => {
    await use(new CartPage(injectSession));
  },
  checkoutPage: async ({ injectSession }, use) => {
    await use(new CheckoutPage(injectSession));
  },
});
