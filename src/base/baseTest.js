const webDriver = require('selenium-webdriver')

export default class BaseTest{
    constructor(browser){
        this.webDriver = new webDriver.Builder().forBrowser(browser).build()
    }

    async quit(){
        await this.webDriver.quit()
    }
}