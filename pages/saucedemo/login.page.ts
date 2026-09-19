import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    super(page);
    ((this.username = this.page.locator('css=#user-name')),
      (this.password = this.page.locator('css=#password')),
      (this.loginButton = this.page.locator('css=#login-button')),
      (this.products = this.page.locator('css=.inventory_item')));
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillTextLocator(this.username, username);
    await this.fillTextLocator(this.password, password);
    await this.clickElementLocator(this.loginButton);
  }
  async navigateToProductsPage(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    this.products.first().waitFor({ state: 'visible' });
  }
}
