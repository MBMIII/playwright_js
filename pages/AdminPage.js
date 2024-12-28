import {BasePage} from "./BasePage"
import {expect} from "@playwright/test";

const SELECTORS = {
    topBar: ".oxd-topbar-body",
    tableFilter: ".oxd-table-filter",
    recordsTable: ".orangehrm-paper-container"
};

export class AdminPage extends BasePage {

    constructor(page) {
        super(page);
        this.topBar = this.page.locator(SELECTORS.topBar);
        this.tableFilter = this.page.locator(SELECTORS.tableFilter);
        this.recordsTable = this.page.locator(SELECTORS.recordsTable);
    }

    async verifyAdminPageElementsAreDisplaying() {
        await expect(this.topBar).toBeVisible();
        await expect(this.tableFilter).toBeVisible();
        await expect(this.recordsTable).toBeVisible();
    }
}