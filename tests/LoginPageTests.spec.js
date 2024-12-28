import {expect, test} from "../fixtures/Setup.js"
import dotenv from 'dotenv';

dotenv.config();
const {OHRM_USERNAME, OHRM_PASSWORD} = process.env

test("Verify login page can be loaded", async ({loginPage}) => {
    await loginPage.openLoginPage();
    await loginPage.verifyLoginPageElementsAreDisplaying();
});

test("Verify login with valid credentials", async ({loginPage, dashboardPage}) => {
    await loginPage.openLoginPage();
    await loginPage.loginWithCredentials(OHRM_USERNAME, OHRM_PASSWORD);
    await expect(dashboardPage.page).toHaveURL(dashboardPage.getPageUrl("dashboardPageUrl"));
});

test("Verify error message when incorrect username provided", async ({loginPage}) => {
    await loginPage.openLoginPage();
    await loginPage.loginWithCredentials("value", OHRM_PASSWORD)
    await loginPage.loginButton.click();
    const errorAlert = loginPage.getErrorAlertLocator();
    await expect(errorAlert).toHaveText(loginPage.errorMessages.invalidCredentialsError);
})

test("Verify error message when incorrect password provided", async ({loginPage}) => {
    await loginPage.openLoginPage();
    await loginPage.loginWithCredentials(OHRM_USERNAME, "value")
    await loginPage.loginButton.click();
    const errorAlert = loginPage.getErrorAlertLocator();
    await expect(errorAlert).toHaveText(loginPage.errorMessages.invalidCredentialsError);
})

test("Verify error message when credentials not provided", async ({loginPage}) => {
    await loginPage.openLoginPage();
    await loginPage.loginButton.click();
    const errorAlert = loginPage.getRequiredErrorLocator();
    await expect(errorAlert.nth(0)).toHaveText(loginPage.errorMessages.requiredError);
    await expect(errorAlert.nth(1)).toHaveText(loginPage.errorMessages.requiredError);
})

