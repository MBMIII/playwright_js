import {BasePage} from "./BasePage";
import {expect} from "@playwright/test";

const SELECTORS = {
    usernameField: 'input[name="username"]',
    passwordField: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    logo: 'company-branding',
    errorAlert: "[role='alert'] > div > p",
    requiredError: ".oxd-form-row > div > span"
};

export class LoginPage extends BasePage {

    constructor(page) {
        super(page);
        this.usernameField = this.page.locator(SELECTORS.usernameField);
        this.passwordField = this.page.locator(SELECTORS.passwordField);
        this.loginButton = this.page.locator(SELECTORS.loginButton);
    }

    async openLoginPage() {
        await this.page.goto(this.getPageUrl('loginPageUrl'));
        const logo = this.page.getByAltText(SELECTORS.logo);
        await expect(logo).toBeVisible();
    }

    async verifyLoginPageElementsAreDisplaying() {
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async loginWithCredentials(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    getErrorAlertLocator() {
        return this.page.locator(SELECTORS.errorAlert);
    }

    getRequiredErrorLocator(){
        return this.page.locator(SELECTORS.requiredError);
    }
}

