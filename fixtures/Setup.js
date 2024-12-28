import {expect, test as extendedTest} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {AdminPage} from "../pages/AdminPage";
import {DashboardPage} from "../pages/DashboardPage";
import {SideMenu} from "../pages/SideMenu";

const test = extendedTest.extend({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    sideMenu: async ({page}, use) => {
        const sideMenu = new SideMenu(page)
        await use(sideMenu);
    },
    dashboardPage: async ({page}, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
    adminPage: async ({page}, use) => {
        const adminPage = new AdminPage(page);
        await use(adminPage);
    },
});

export {test, expect};