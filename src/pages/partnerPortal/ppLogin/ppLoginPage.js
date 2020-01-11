import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('selenium-webdriver');

export default class PPLoginPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // Url
    this.loginPageUrl = urls.partnerPortal;
    // Xpath
    this.emailInput = By.xpath('//input[@id="username"]');
    this.passwordInput = By.xpath('//input[@id="password"]');
    this.loginBtn = By.xpath('//button[@id ="login-button"]');
   // this.logoutBtn = By.xpath('//a[@title="Logout"]');
    // this.logoutConf = By.xpath('//button[contains(text(),"Let me in")]');
    // this.errorMessage = By.xpath('//div[@id="errorMessage"]');
    // Values

    this.username = process.env.ppEmail;
    this.password = process.env.ppPass;
  }

  async open() {
    await this.openUrl(this.loginPageUrl);
    console.log('Opening URL', this.loginPageUrl);
  }

  async enterEmail(email) {
    if (email) this.username = email;
    const emailInput = await this.findElement(this.emailInput);
    await emailInput.sendKeys(this.username);
    console.log('Email entered');
  }

  async enterPassword(password) {
    if (password) this.password = password;
    const passwordInput = await this.findElement(this.passwordInput);
    await passwordInput.sendKeys(this.password);
    console.log('Password entered');
  }

  async loginClick() {
    const loginBtn = await this.findElement(this.loginBtn);
    await loginBtn.click();
    console.log('Logging in');
  }

  async validateLogout() {
    const logoutConf = await this.waitForElementLocated(this.logoutConf, 20000);
    console.log('Logout Confirmed');
    return logoutConf;
  }

  async logOut() {
    const logoutBtn = await this.waitForElementLocated(this.logoutBtn, 20000);
    await logoutBtn.click();
  }

  async getErrorElement() {
    const errorElem = await this.waitForElementLocated(this.errorMessage, 20000);
    console.log('Error Message found');
    return errorElem;
  }
}
