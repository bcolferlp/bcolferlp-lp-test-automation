import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class IPLoginPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // Url
    this.loginPageUrl = urls.investorPortal;
    // Xpath
    this.emailInput = By.xpath('//input[@id="email"]');
    this.passwordInput = By.xpath('//input[@id="password"]');
    this.loginBtn = By.xpath('//div[@id="form-access"]//button');
    this.logoutBtn = By.xpath('//a[@data-tip="Logout"]');
    this.errorMessage = By.xpath('//div[@id="errorMessage"]');
    this.dashboardTarget = By.xpath('//h6[contains(text(), "Dashboard")]');
    // Values
    this.username = process.env.TESTEMAIL;
    this.password = process.env.TESTPASS;
  }

  async standardLogin({ username, password }) {
    console.log('Standard User Login');
    await this.fullScreen();
    await this.open();
    await this.enterEmail(username);
    await this.enterPassword(password);
    await this.loginClick();
    await this.waitForTarget(this.dashboardTarget);
  }

  async completelogin() {
    console.log('Complete Login');
    await this.fullScreen();
    await this.open();
    await this.enterEmail();
    await this.enterPassword();
    await this.loginClick();
    await this.waitForTarget(this.dashboardTarget);
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

  async validateLogin() {
    const logoutBtn = await this.waitForElementLocated(this.logoutBtn, 20000);
    console.log('Logout button found');
    return logoutBtn;
  }

  async getErrorElement() {
    const errorElem = await this.waitForElementLocated(this.errorMessage, 20000);
    console.log('Error Message found');
    return errorElem;
  }

  async logout() {
    const logoutBtn = await this.waitForElementLocated(this.logoutBtn, 5000);
    await logoutBtn.click();
    console.log('Logging out');
  }
}
