import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.username = this.page.locator('#userEmail');
    this.password = this.page.locator('#userPassword');
    this.submit = this.page.locator('#login');
  }

  async login(username: string, password: string) {
    await this.fillText(this.username, username);
    await this.fillText(this.password, password);
    await this.clickElement(this.submit);
  }
}
