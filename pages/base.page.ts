import { Locator, Page } from '@playwright/test';

export default class BasePage {
  currentPage: Page;
  constructor(protected page: Page) {
    this.currentPage = page;
  }

  async clickElementLocator(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillTextLocator(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async selectDropdownOption(locator: Locator, option: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(option);
  }

  async enterTextSequentially(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.pressSequentially(text);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.innerText();
  }
  async waitForElementLocator(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
