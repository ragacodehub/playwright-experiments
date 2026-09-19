import {Page, expect} from '@playwright/test'

export default class CheckoutPage{

    checkoutHeader="//span[text()='Checkout: Your Information']"
    firstName="#first-name"
    lastName="#last-name"
    zipcode="#postal-code"
    continueButton="#continue"
    checkoutOverviewHeader="//span[text()='Checkout: Overview']"
    finishButton="#finish"
    successMessage="#checkout_complete_container h2"

    constructor(private page:Page){}

    async isCheckoutPageDisplayed(): Promise<void>
    {
        await this.page.locator(this.checkoutHeader).waitFor({state:"visible"})
    }

    async fillInformationAndCheckout(firstname:string, lastname:string, zipcode:Number): Promise<void>
    {
        await this.page.locator(this.firstName).waitFor({state:"visible"})
        await this.page.fill(this.firstName,firstname)
        await this.page.fill(this.lastName,lastname)
        await this.page.fill(this.zipcode,zipcode.toString())
        await this.page.locator(this.continueButton).click()
        await expect(this.page.locator(this.checkoutOverviewHeader)).toBeVisible()
        await this.page.locator(this.finishButton).waitFor({state:"visible"})
        await this.page.locator(this.finishButton).click()
    }
}