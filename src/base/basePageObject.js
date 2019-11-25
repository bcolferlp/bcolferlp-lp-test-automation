const { By, until } = require("selenium-webdriver");

export default class BasePageObject {
  constructor(webDriver) {
    this.webDriver = webDriver;
  }

  async openUrl(url) {
    await this.webDriver.get(url);
  }

  async close() {
    await this.webDriver.close();
  }

  async findElement(locator) {
    const elem = await this.webDriver.findElement(locator);
    return elem;
  }

  async waitForElementLocated(locator, timeSec) {
    const elem = await this.webDriver.wait(until.elementLocated(locator, timeSec));
    return elem;
  }

  async waitForTextContains(locator, textContains, timeSec) {
    const webElem = await this.findElement(locator);
    await this.webDriver.wait(until.elementTextContains(webElem, textContains), timeSec);
  }

  async getTextFromElement(locator) {
    const webElem = await this.findElement(locator);
    const text = await webElem.getText();
    return text;
  }
}
