import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class ProductsPage extends BasePage {
  readonly cartButton: Locator;
  readonly addProductToCart: string;
  readonly cartheader: Locator;

  constructor(page: Page) {
    super(page);
    ((this.cartButton = this.page.locator('css=.shopping_cart_link')),
      (this.addProductToCart = "ancestor::div[@class='inventory_item_description']/div[2]/button"),
      (this.cartheader = this.page.locator("xpath=//span[text()='Your Cart']")));
  }

  async addToCart(userType: string, productName: string): Promise<boolean> {
    const enabledProducts: string[] = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie',
    ];
    const product = this.page.getByText(productName);
    if (
      userType === 'standard' ||
      (userType === 'problem' && enabledProducts.includes(productName))
    ) {
      await this.clickElementLocator(product.locator(`xpath=${this.addProductToCart}`));
      return true;
    } else if (userType === 'problem' && !enabledProducts.includes(productName)) {
      return await product.isEnabled();
    }
    return false;
  }

  async navigateToCart(): Promise<void> {
    await this.clickElementLocator(this.cartButton);
    await this.waitForElementLocator(this.cartheader);
  }
}
