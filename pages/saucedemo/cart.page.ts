import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class CartPage extends BasePage {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = this.page.locator('#checkout');
  }

  async clickCheckoutButton(): Promise<void> {
    await this.clickElementLocator(this.checkoutButton);
  }
}
