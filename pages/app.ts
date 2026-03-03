import { Page } from '@playwright/test'
import { LoginPage } from './login.page'

export class App {
    readonly loginPage: LoginPage

    constructor(page: Page) {
        this.loginPage = new LoginPage(page)
    }
}
