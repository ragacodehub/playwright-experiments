import {Page} from '@playwright/test'
import CheckoutPage from './checkout.page'

export default class CartPage{

 cartheader="//span[text()='Your Cart']"
 checkoutButton="#checkout"
  constructor(private page:Page){}

  async clickOnCheckout():Promise<void>
  {
    await this.page.locator(this.cartheader).waitFor({state:'visible'})
    await this.page.locator(this.checkoutButton).waitFor({state:'visible'})
    await this.page.locator(this.checkoutButton).click()
  }
}
