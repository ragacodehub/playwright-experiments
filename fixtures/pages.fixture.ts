import LoginPage from '../pages/login.page'
import ProductsPage from '../pages/products.page'
import CartPage from '../pages/cart.page'
import CheckoutPage from '../pages/checkout.page'
import {test as base} from '@playwright/test'


type saucedemoPages={
    loginPage:LoginPage
    productsPage:ProductsPage
    cartPage:CartPage
    checkoutPage:CheckoutPage
}

export const test= base.extend<{saucedemo: saucedemoPages}>({

    saucedemo: async({page}, use)=>
    {
       const saucedemo: saucedemoPages = {
        loginPage: new LoginPage(page),
        productsPage:new ProductsPage(page),
        cartPage:new CartPage(page),
        checkoutPage: new CheckoutPage(page)
    };
     await use(saucedemo)
    }
})