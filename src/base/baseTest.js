const webDriver = require('selenium-webdriver');

export default class BaseTest {
  constructor(browser) {
    this.webDriver = new webDriver.Builder().forBrowser(browser).build();
  }

  async close() {
    await this.webDriver.close();
  }

  async quit() {
    await this.webDriver.quit();
  }
}
