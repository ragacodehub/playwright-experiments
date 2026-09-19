import {Page, expect} from '@playwright/test'
import CartPage from './cart.page'

export default class ProductsPage{

    products=".inventory_item"
    addToCartButton=".pricebar button"
    cartButton=".shopping_cart_link"

    constructor(private page:Page){}

    async isProductPageDisplayed():Promise<void>
    {
      await this.page.locator(this.products).first().waitFor({state:'visible'})
      await expect(this.page.locator(this.products).first()).toBeVisible()
    }

    async addToCart():Promise<void>
    {
        await this.page.locator(this.addToCartButton).first().waitFor({state:'visible'})
        await this.page.locator(this.addToCartButton).first().click()
    }

    async navigateToCart():Promise<void>
    {
        await this.page.locator(this.cartButton).waitFor({state:'visible'})
        await this.page.locator(this.cartButton).click()
    }
}