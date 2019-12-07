import BasePageObject from '../../../base/basePageObject';
const { By, until } = require('selenium-webdriver');
require('../../../utilities/imports');
export default class EmailPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.emailUrl = 'https://mail.testemail.loanpal.com/webmail/';
    // XPath
    this.emailTarget = By.xpath(`//div[contains(text(),"${process.env.emailUser}")]`);
    this.emailInput = By.xpath('//input[@type="email"]');
    this.passwordInput = By.xpath('//input[@type="password"]');
    this.emailSignIn = By.xpath('//button[@type="submit"]');
    this.profileDropdown = By.xpath('//a[@id="top-system-dropdown-id"]');
    this.emailLogoutBtn = By.xpath('//span[contains(text(), "Logout")]');
    this.docuSignEmail = By.xpath('(//*[contains(text(),"Please sign your Solar Loan Docs")])[1]');
    this.reviewDocs = By.xpath('//span[contains(text(), "REVIEW")]/../../a');
    this.checkAllBox = By.xpath('//i[contains(@class, "checkboxCkeckAll")]');
    this.deleteAllMail = By.xpath('//a[contains(@class, "button-delete command no-disabled")]');
    this.emptyList = By.xpath('//span[contains(text(),"Empty list")]');
    this.refreshBtn = By.xpath('//a[contains(@class, "buttonReload command no-disabled")]');
    // Environment variables
    this.emailUser = process.env.emailUser;
    this.emailPass = process.env.emailPass;
  }
  async goToEmail() {
    await this.openUrl(this.emailUrl);
  }
  async emailLogin() {
    const emailInput = await this.waitForElementLocated(this.emailInput, 5000);
    await emailInput.sendKeys(this.emailUser);
    await this.sleep(1000);
    const passwordInput = await this.waitForElementLocated(this.passwordInput, 5000);
    await passwordInput.sendKeys(this.emailPass);
    await this.sleep(1000);
    const submitBtn = await this.waitForElementLocated(this.emailSignIn, 5000);

    await submitBtn.click();
    await this.waitForTarget(this.emailTarget);
  }
  async emailLogout() {
    const profileDropdown = await this.waitForElementLocated(this.profileDropdown, 5000);
    await profileDropdown.click();
    console.log('Dropdown clicked');
    const emailLogoutBtn = await this.waitForElementLocated(this.emailLogoutBtn, 5000);
    await emailLogoutBtn.click();
    console.log('Logged out');
  }
  async findEmail(emailRow) {
    const elem = await this.waitForElementLocated(emailRow, 10000);
    await elem.click();
  }
  async findEmailLink(emailLink) {
    const link = await this.waitForElementLocated(emailLink, 10000);
    await link.click();
  }
  async getDocuSignEmail() {
    // locates latest docusign email
    const docuSignEmail = await this.waitForElementLocated(this.docuSignEmail, 10000);
    await docuSignEmail.click();
    await this.sleep(1000);
    // Redirect to Docusign
    const reviewDocsBtn = await this.waitForElementLocated(this.reviewDocs, 10000);
    await reviewDocsBtn.click();
  }
  async refreshEmail() {
    const refreshBtn = await this.waitForElementLocated(this.refreshBtn, 10000);
    await refreshBtn.click();
  }
  async deleteMail() {
    // Selects all emails in the list
    const checkAllBox = await this.waitForElementLocated(this.checkAllBox, 10000);
    await checkAllBox.click();
    await this.sleep(1000);
    // Deletes the mail
    const deleteAllMail = await this.waitForElementLocated(this.deleteAllMail, 10000);
    await deleteAllMail.click();
  }
}
