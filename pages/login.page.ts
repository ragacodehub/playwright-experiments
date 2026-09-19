import {Page} from '@playwright/test'
import ProductsPage from './products.page'

export default class LoginPage{

username="#user-name"
password="#password"
loginButton="#login-button"

constructor(private page:Page){}

async login (username:string, password:string): Promise<void>{
    await this.page.fill(this.username, username)
    await this.page.fill(this.password, password)
    await this.page.click(this.loginButton)
}

}