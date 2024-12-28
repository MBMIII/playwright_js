import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";

export class SideMenu {

    constructor(page) {
        this.page = page;
        this.basePage = new BasePage(page)
        this.pagesLocator = this.page.locator("ul.oxd-main-menu > li");
    }

    async goToAdminPage() {
        await this.pagesLocator.nth(0).click();
        await expect(this.page).toHaveURL(this.basePage.getPageUrl("adminPageUrl"));
    }
}