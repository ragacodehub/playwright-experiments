import { Locator, Page } from '@playwright/test';
import BasePage from '../base.page';

export default class HomePage extends BasePage {
  readonly addedToCartToast: Locator;
  readonly cartButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addedToCartToast = this.page.locator('.toast-success');
    this.cartButton = this.page.locator("//button[contains(text(),'Cart ')]");
    this.addToCartButton = this.page.locator("//button[text()=' Add To Cart']");
  }

  async clickAddToCart(productName: string): Promise<void> {
    await this.clickElement(
      this.page
        .locator(`//b[text()='${productName}']//ancestor::div[@class='card-body']`)
        .locator(this.addToCartButton)
    );
  }

  async clickCartButton(): Promise<void> {
    await this.clickElement(this.cartButton);
  }
}
