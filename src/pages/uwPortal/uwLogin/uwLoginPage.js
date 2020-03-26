import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class UWLoginPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // URLs
    this.loginPageUrl = urls.underwriterPortal;
    // XPath
    this.img = {
      lpLogo: By.xpath('//img[contains(@alt,"Loanpal")]')
    };
    this.label = {
      errorMessage: text => By.xpath(`//*[contains(text(), "${text}")]`)
    };
    this.textBox = {
      username: By.xpath('//input[@id="username"]'),
      password: By.xpath('//input[@id="password"]')
    };
    this.button = {
      login: By.xpath('//button[@id="loader-button"]'),
      logout: By.xpath('//a[contains(@class,"logout")]')
    };
    this.checkBox = {};
    this.link = {
      forgotPassword: By.xpath('//div[contains(@class,"password-help")]'),
      backToLogin: By.xpath('//input[@id="acceso"]'),
      profile: value => By.xpath(`//a[text()="${value}"]`)
    };
    // values
    this.username = process.env.TESTEMAIL;
    this.password = process.env.TESTPASS;
  }

  async completelogin() {
    console.log('Complete Login');
    await this.fullScreen();
    await this.open();
    const [profile] = await this.findElements(this.button.logout);
    if (profile) {
      console.log('Already Logged in');
      return;
    }
    await this.enterEmail();
    await this.enterPassword();
    await this.loginClick();
    await this.waitForTarget(this.button.logout);
  }

  async open() {
    await this.openUrl(this.loginPageUrl);
    console.log('Opening URL', this.loginPageUrl);
    await this.waitForTarget(this.img.lpLogo);
  }

  async enterEmail(email) {
    if (email) this.username = email;
    const emailInput = await this.waitForElementLocated(this.textBox.username, 5000);
    await this.enterText(emailInput, this.username);
    console.log('Email entered');
  }

  async enterPassword(password) {
    if (password) this.password = password;
    const passwordInput = await this.waitForElementLocated(this.textBox.password, 5000);
    await this.enterText(passwordInput, this.password);
    console.log('Password entered');
  }

  async loginClick() {
    const loginBtn = await this.waitForElementLocated(this.button.login, 5000);
    await loginBtn.click();
    console.log('Logging in');
  }

  async validateLogin() {
    const logoutBtn = await this.waitForElementLocated(this.button.logout, 20000);
    console.log('Logout button found');
    return logoutBtn;
  }

  async getErrorElement() {
    const errorElem = await this.waitForElementLocated(this.label.errorMessage, 20000);
    console.log('Error Message found');
    return errorElem;
  }

  async logout() {
    const logoutBtn = await this.waitForElementLocated(this.button.logout, 5000);
    await logoutBtn.click();
    console.log('Logging out');
  }

  async validateMessage(message) {
    const element = await this.waitForElementLocated(this.label.errorMessage(message), 5000);
    return element;
  }
}
