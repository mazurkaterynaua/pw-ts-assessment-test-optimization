import { Page, Locator, expect } from '@playwright/test'
import { CaptchaStatus } from '../constants/api-resp'

export class LoginPage {
    private readonly page: Page
    private readonly url: string
    private readonly emailInput: Locator
    private readonly closeBannerButton: Locator
    private readonly submitEmailButton: Locator
    private readonly validationMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.url = '/nl/mytui/'
        this.emailInput = this.page.locator('.login-form').filter(
            {has: this.page.locator('[role="alert"]')}
        ).locator('input#email')
        this.closeBannerButton = this.page.locator('#cmCloseBanner')
        this.submitEmailButton = this.page.locator('.login-form').filter(
            {has: this.page.locator('.ca-input.ca-input_text.login-form__input.success')}
        ).locator('button.login-form__submit')
        this.validationMessage = this.page.locator('[role="alert"].alert-message').locator('.alert-message__content')
    }

    async open(): Promise<void> {
        await this.page.goto(this.url)
    }

    async expectBannerIsVisible(): Promise<void>  {
        await expect(this.closeBannerButton, 'Banner close button should be visible').toBeVisible()
    }

    async closeBanner(): Promise<void> {
        await this.closeBannerButton.click()
    }

    async expectBannerIsHidden(): Promise<void>  {
        await expect(this.closeBannerButton, 'Banner close button should be visible').toBeHidden()
    }

    async expectEmailInputVisible(): Promise<void> {
        await expect(this.emailInput, 'Email input should be visible').toBeVisible()
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.click()
        await this.emailInput.fill(email)
        await this.emailInput.blur()
    }

    /**
     * click on submit email button and make sure successful /graphql response with validation error received
     */
    async submitEmail(): Promise<void> {
        const submitPromise = this.page.waitForResponse(async (res) => {
         return   res.url().includes(`/customer/mwa/login-mfe/graphql`) &&
            res.status() === 200 &&
            (await res.json()).errors
    })

        await this.submitEmailButton.click()

        const res = await submitPromise
        const resBody = await res.json()

        expect(resBody.errors.at(0).errorType, 'Error response should be received').toEqual(CaptchaStatus.captchaInvalid)
    }

    async expectErrorMessageToAppear(): Promise<void> {
        await expect(this.validationMessage, 'Validation message starting with "Oops" should be visible').toHaveText(/^Oops/)
    }
}