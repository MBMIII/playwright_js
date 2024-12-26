import {expect, test} from "@playwright/test"
import {LoginPage} from "../pages/LoginPage";
import dotenv from 'dotenv';
dotenv.config();

let loginPage, validUsername, validPassword;

test.beforeEach("Initialization", async ({page}) => {
    loginPage = new LoginPage(page, expect);
    validUsername = process.env.OHRM_USERNAME;
    validPassword = process.env.OHRM_PASSWORD;
});

test("Verify login page can be loaded", async () => {
    await loginPage.openLoginPage();
    await loginPage.verifyLoginPageElementsAreDisplaying();
});

test("Verify login with valid credentials", async ({page}) => {
    await loginPage.openLoginPage();
    await loginPage.loginWithCredentials(validUsername, validPassword);
    await expect(page).toHaveURL(loginPage.getDashboardUrl());
});

test("Verify error message when incorrect username provided", async ()=>{
    await loginPage.openLoginPage();
    await loginPage.loginWithCredentials("value", validPassword)
    await loginPage.loginButton.click();
    const errorAlert = loginPage.getErrorAlert();
    await expect(errorAlert).toHaveText(loginPage.errorMessages.invalidCredentialsError);
})

test("Verify error message when incorrect password provided", async ()=>{
    await loginPage.openLoginPage();
    await loginPage.loginWithCredentials(validUsername, "value")
    await loginPage.loginButton.click();
    const errorAlert = loginPage.getErrorAlertLocator();
    await expect(errorAlert).toHaveText(loginPage.errorMessages.invalidCredentialsError);
})

test.only("Verify error message when credentials not provided", async ()=>{
    await loginPage.openLoginPage();
    await loginPage.loginButton.click();
    const errorAlert = loginPage.getRequiredErrorLocator();
    await expect(errorAlert.nth(0)).toHaveText(loginPage.errorMessages.requiredError);
    await expect(errorAlert.nth(1)).toHaveText(loginPage.errorMessages.requiredError);
})

