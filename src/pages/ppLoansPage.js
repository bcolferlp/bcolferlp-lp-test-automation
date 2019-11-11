import BasePageObject from "../base/basePageObject"
const { By, until } = require('selenium-webdriver');

export default class PPLoansPage extends BasePageObject{
    constructor(webDriver){
        super(webDriver);
        this.exportButtonLocator = By.xpath("//span[.='Export']")
    }

    async waitForLoansPage(){
        await this.waitForElementLocated(this.exportButtonLocator)
    }

    async isExportButtonVisible(){
        const elemExportButton = await this.findElement(this.exportButtonLocator)
        const isDisplayed = await elemExportButton.isDisplayed()
        return isDisplayed
    }
}