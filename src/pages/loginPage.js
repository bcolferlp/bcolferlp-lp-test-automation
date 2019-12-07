import BasePageObject from '../base/basePageObject';

const { By } = require('selenium-webdriver');

export default class LoginPage extends BasePageObject {
  constructor(webDriver, url) {
    super(webDriver);
    this.loginPageUrl = url;
    this.usernameLocator = By.id('username');
    this.passwordLocator = By.id('password');
    this.loginButtonLocator = By.xpath("//button[@class='btn btn-lg btn-primary btn-block']");
    this.username = 'test_manager@loanpal.com';
    this.password = 'Abcd1234!';
    this.errorMessageLocator = By.id('errorMessage');
  }

  async open() {
    await this.openUrl(this.loginPageUrl);
  }

  async loginClick(username = this.username, password = this.password) {
    const webElemUsername = await this.findElement(this.usernameLocator);
    const webElemPassword = await this.findElement(this.passwordLocator);
    const webElemLoginButton = await this.findElement(this.loginButtonLocator);
    await webElemUsername.sendKeys(username);
    await webElemPassword.sendKeys(password);
    await webElemLoginButton.click();
  }

  async negativeLogin(username, password) {
    await this.loginClick(username, password);
    await this.waitForErrorMessage;
  }

  async waitForErrorMessageToShow() {
    await this.waitForTextContains(this.errorMessageLocator, 'The', 5000);
  }

  async getErrorMessageText() {
    return this.getTextFromElement(this.errorMessageLocator);
  }
}
