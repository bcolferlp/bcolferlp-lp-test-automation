const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const { Builder } = require('selenium-webdriver');

export default class BaseTest {
  constructor(browser) {
    this.webDriver = this.setDriver(browser, process.env.headless);
  }

  setDriver(browser, headless = false) {
    if (browser === 'chrome' && headless) {
      return new Builder()
        .forBrowser(browser)
        .setChromeOptions(new chrome.Options().headless().windowSize({ width: 1920, height: 1080 }))
        .build();
    }
    return new Builder().forBrowser(browser).build();
  }

  async close() {
    await this.webDriver.close();
  }

  async quit() {
    await this.webDriver.quit();
  }
}
