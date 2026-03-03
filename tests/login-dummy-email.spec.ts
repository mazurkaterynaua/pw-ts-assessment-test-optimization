import { test } from '../fixtures/base.fixture'

const testEmail = 'test@mailsac.com'

test('should verify error message upon login with non-existing email', async ({ app }) => {
    // BEFORE 
    // await page.goto('https://www.tui.be/nl/mytui/');

    // await page.waitForTimeout(2000);
    // await page.click('#cmCloseBanner');

    // await page.waitForTimeout(3000);
    // await page.locator('#email').nth(1).click();
    // await page.locator('#email').nth(1).fill('test@mailsac.com');

    // await page.waitForTimeout(2000);
    // await page.locator('button.mfe-button').nth(1).click();

    // await page.waitForTimeout(3000);
    // const result = await page.locator(".login-wrapper .alert-message__content").textContent();
    // expect(result != null).toBeTruthy();
    
    // AFTER
    const loginPage = app.loginPage

    await loginPage.open()

    // TODO: uncomment after bug fixed (pop-up does not appear)
    // await loginPage.expectBannerIsVisible()
    // await loginPage.closeBanner()
    // await loginPage.expectBannerIsHidden()

    await loginPage.expectEmailInputVisible()
    await loginPage.enterEmail(testEmail)
    await loginPage.submitEmail()
    await loginPage.expectErrorMessageToAppear()
});
