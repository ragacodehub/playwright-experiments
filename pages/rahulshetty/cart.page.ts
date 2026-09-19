import { Locator, Page } from '@playwright/test';
import BasePage from '../base.page';

export default class CartPage extends BasePage {
  readonly productName: Locator;
  readonly buyNowButton: Locator;
  readonly deleteButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = this.page.locator("//div[@class='cartSection']/h3");
    this.buyNowButton = this.page.locator("//button[text()='Buy Now']");
    this.deleteButton = this.page.locator("//button[@class='btn btn-danger']");
    this.checkoutButton = this.page.locator("//button[text()='Checkout']");
  }

  get productCardElements(): Locator[] {
    return [this.productName, this.deleteButton, this.buyNowButton];
  }

  async clickCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }
}
