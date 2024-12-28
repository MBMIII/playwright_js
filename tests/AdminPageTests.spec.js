import {test} from "../fixtures/Setup.js"
import dotenv from 'dotenv';

dotenv.config();
const {OHRM_USERNAME, OHRM_PASSWORD} = process.env

test.only("Verify admin page can be loaded", async ({loginPage, sideMenu, adminPage}) => {
    await loginPage.openLoginPage();
    await loginPage.loginWithCredentials(OHRM_USERNAME, OHRM_PASSWORD);
    await sideMenu.goToAdminPage();
    await adminPage.verifyAdminPageElementsAreDisplaying();
});