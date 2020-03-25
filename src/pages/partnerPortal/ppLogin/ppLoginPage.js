import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class PPLoginPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // Url
    this.loginPageUrl = urls.partnerPortal;

    // Xpath
    this.lpLogoImage = By.xpath('//img[contains(@alt,"Loanpal")]');

    this.usernameInput = By.id('username');
    this.passwordInput = By.id('password');
    this.loginBtn = By.id('loginButton');

    this.logoutBtn = By.xpath('//a[@title="Logout"]//small[text()="Logout"]/../..');
    this.loanList = By.xpath("//a[@title='All Loans']");

    this.errorMessage = By.id('errorMessage');

    this.username = process.env.TESTEMAIL;
    this.password = process.env.TESTPASS;
  }

  async completeLogin() {
    console.log('Complete Login');
    await this.fullScreen();
    await this.open();
    await this.enterEmail();
    await this.enterPassword();
    await this.loginClick();
    await this.waitForElementLocated(this.loanList);
    await this.waitForElementLocated(this.logoutBtn);
  }

  async open() {
    await this.openUrl(this.loginPageUrl);
    console.log('Opening URL', this.loginPageUrl);
    await this.waitForTarget(this.lpLogoImage);
  }

  async enterEmail(email) {
    if (email) this.username = email;
    const emailInput = await this.findElement(this.usernameInput);
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
    const loginConfirmation = await this.waitForElementLocated(this.loanList);
    console.log('Loan List button is displayed');
    return loginConfirmation;
  }
  async validateLogout() {
    const logoutConf = await this.waitForElementLocated(this.loginBtn, 20000);
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
