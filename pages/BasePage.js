import fs from 'fs';
import path from 'path';

export class BasePage {

    constructor(page) {
        const testDataPath = path.resolve(__dirname, "../data/testData.json");
        const rawData = fs.readFileSync(testDataPath);
        this.urls = JSON.parse(rawData).url;
        this.errorMessages = JSON.parse(rawData).errorMessages;
        this.page = page;
    }

    getPageUrl(pageName) {
        if (!this.urls[pageName]) {
            throw new Error(`Page name ${pageName} not found in URLs`);
        }
        return `${this.urls.baseUrl}${this.urls[pageName]}`;
    }
}
