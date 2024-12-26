import fs from 'fs';
import path from 'path';

export class BasePage {
    constructor(page, expect) {
        const testDataPath = path.resolve(__dirname, '../data/testData.json');
        const rawData = fs.readFileSync(testDataPath);
        this.urls = JSON.parse(rawData).url;
        this.errorMessages = JSON.parse(rawData).errorMessages;
        this.page = page;
        this.expect = expect;
    }

    get baseUrl() {
        return this.urls.baseUrl;
    }

    getLoginUrl() {
        return `${this.baseUrl}${this.urls.loginPage}`;
    }

    getDashboardUrl() {
        return `${this.baseUrl}${this.urls.dashboardPage}`;
    }
}
