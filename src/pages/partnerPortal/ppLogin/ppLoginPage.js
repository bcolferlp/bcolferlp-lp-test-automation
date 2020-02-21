import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class PPLoginPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // Url
    this.loginPageUrl = urls.partnerPortal;
    // Xpath
    this.img = {
      lpLogo: By.xpath('//img[contains(@alt,"Loanpal")]')
    };
    this.emailInput = By.xpath('//input[@id="username"]');
    this.passwordInput = By.xpath('//input[@id="password"]');
    this.button = {
      login: By.xpath('//button[contains(text(), "Let me in")]'),
      logout: By.xpath('//a[@title="Logout"]')
    };

    this.link = {
      profile: value => By.xpath(`//a[@title="${value}"]`)
    };
    this.username = process.env.testEmail;
    this.password = process.env.emailPass;
  }

  async completeLogin() {
    console.log('Complete Login');
    await this.fullScreen();
    await this.open();
    const [profile] = await this.findElements(this.link.profile(this.username));
    if (profile) {
      console.log('Already Logged in');
      return;
    }
    await this.enterEmail();
    await this.enterPassword();
    await this.loginClick();
  }

  async open() {
    await this.openUrl(this.loginPageUrl);
    console.log('Opening URL', this.loginPageUrl);
    await this.waitForTarget(this.img.lpLogo);
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
    const loginBtn = await this.findElement(this.button.login);
    await loginBtn.click();
    console.log('Logging in');
  }

  async validateLogout() {
    const logoutConf = await this.waitForElementLocated(this.logoutConf, 20000);
    console.log('Logout Confirmed');
    return logoutConf;
  }

  async logOut() {
    const logoutBtn = await this.waitForElementLocated(this.button.logout, 20000);
    await logoutBtn.click();
  }

  async getErrorElement() {
    const errorElem = await this.waitForElementLocated(this.errorMessage, 20000);
    console.log('Error Message found');
    return errorElem;
  }
}
