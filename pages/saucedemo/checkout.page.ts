import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class CheckoutPage extends BasePage {
  readonly checkoutHeader: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipcode: Locator;
  readonly continueButton: Locator;
  readonly checkoutOverviewHeader: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    ((this.checkoutHeader = this.page.locator("xpath=//span[text()='Checkout: Your Information']")),
      (this.firstName = this.page.locator('#first-name')),
      (this.lastName = this.page.locator('#last-name')),
      (this.zipcode = this.page.locator('#postal-code')),
      (this.continueButton = this.page.locator('#continue')),
      (this.checkoutOverviewHeader = this.page.locator("//span[text()='Checkout: Overview']")),
      (this.finishButton = this.page.locator('#finish')),
      (this.successMessage = this.page.locator('#checkout_complete_container h2')));
  }

  async fillInformationAndCheckout(
    firstname: string,
    lastname: string,
    zipcode: Number
  ): Promise<void> {
    await this.waitForElementLocator(this.firstName);
    await this.fillTextLocator(this.firstName, firstname);
    await this.fillTextLocator(this.lastName, lastname);
    await this.fillTextLocator(this.zipcode, zipcode.toString());
    await this.clickElementLocator(this.continueButton);
    await this.waitForElementLocator(this.checkoutOverviewHeader);
    await this.waitForElementLocator(this.finishButton);
    await this.clickElementLocator(this.finishButton);
  }
}
