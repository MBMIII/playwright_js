import {BasePage} from "./BasePage";


export class LoginPage extends BasePage {

    constructor(page, expect) {
        super(page, expect);
        this.usernameField = this.page.locator('input[name="username"]');
        this.passwordField = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('button[type="submit"]');
    }

    async openLoginPage() {
        await this.page.goto(this.getLoginUrl());
        const logo = this.page.getByAltText('company-branding');
        await this.expect(logo).toBeVisible();
    }

    async verifyLoginPageElementsAreDisplaying() {
        await this.expect(this.usernameField).toBeVisible();
        await this.expect(this.passwordField).toBeVisible();
        await this.expect(this.loginButton).toBeVisible();
    }

    async loginWithCredentials(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    getErrorAlertLocator() {
        return this.page.locator("[role='alert'] > div > p");
    }

    getRequiredErrorLocator(){
        return this.page.locator(".oxd-form-row > div > span");
    }
}

