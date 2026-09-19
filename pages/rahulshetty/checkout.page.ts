import { Locator, Page } from '@playwright/test';
import BasePage from '../base.page';

export default class CheckoutPage extends BasePage {
  readonly countryTextFiled: Locator;
  readonly placeOrderButton: Locator;
  readonly confirmationMsg: Locator;
  readonly confirmationToast: Locator;

  constructor(page: Page) {
    super(page);
    this.countryTextFiled = this.page.getByPlaceholder('Select Country');
    this.placeOrderButton = this.page.locator("//a[text()='Place Order ']");
    this.confirmationMsg = this.page.locator("//h1[@class='hero-primary']");
    this.confirmationToast = this.page.locator('.toast-success');
  }

  async enterCountryDetails(text: string): Promise<void> {
    await this.enterTextSequentially(this.countryTextFiled, text);
    await this.clickElement(this.page.locator(`//span[text()=' ${text}']`));
  }

  async clickPlaceOrder(): Promise<void> {
    await this.clickElement(this.placeOrderButton);
  }

  async getOrderConfirmationMsg(): Promise<string> {
    return await this.getText(this.confirmationMsg);
  }
}
