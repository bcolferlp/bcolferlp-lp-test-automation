import BasePageObject from "../../base/basePageObject";
const { By, until } = require("selenium-webdriver");
const { nav } = require("../../utilities/imports");

export default class EmailPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.emailUrl = "https://mail.testemail.loanpal.com/webmail/";
    // XPath
    this.emailTarget = By.xpath(`//div[contains(text(),"${process.env.emailUser}")]`);
    this.emailInput = By.xpath('//input[@type="email"]');
    this.passwordInput = By.xpath('//input[@type="password"]');
    this.emailSignIn = By.xpath('//button[@type="submit"]');
    this.profileDropdown = By.xpath('//a[@id="top-system-dropdown-id"]');
    this.emailLogoutBtn = By.xpath('//span[contains(text(), "Logout")]');
    this.emailUser = process.env.emailUser;
    this.emailPass = process.env.emailPass;
  }
  async goToEmail() {
    await this.openUrl(this.emailUrl);
  }
  async emailLogin() {
    const emailInput = await this.waitForElementLocated(this.emailInput, 5000);
    const passwordInput = await this.waitForElementLocated(this.passwordInput, 5000);
    const submitBtn = await this.waitForElementLocated(this.emailSignIn, 5000);
    await emailInput.sendKeys(this.emailUser);
    await passwordInput.sendKeys(this.emailPass);
    await submitBtn.click();
    await nav.waitForTarget(this.webDriver, this.emailTarget);
  }
  async emailLogout() {
    const profileDropdown = await this.waitForElementLocated(this.profileDropdown, 5000);
    await profileDropdown.click();
    console.log("Dropdown clicked");
    const emailLogoutBtn = await this.waitForElementLocated(this.emailLogoutBtn, 5000);
    await emailLogoutBtn.click();
    console.log("Logged out");
  }
  async findEmail(emailRow) {
    const elem = await this.waitForElementLocated(emailRow, 10000);
    await elem.click();
  }
  async findEmailLink(emalLink) {
    const reviewDocsBtn = await this.waitForElementLocated(emalLink, 10000);
    await reviewDocsBtn.click();
  }
}
