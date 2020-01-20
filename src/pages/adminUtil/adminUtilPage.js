import BasePageObject from '../../base/basePageObject';

const { By, Key } = require('selenium-webdriver');
require('dotenv').config();

export default class ADMINLoginPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // Url
    this.loginPageUrl = process.env.adminURL;

    // Xpath
    this.emailInput = By.xpath('//input[@id ="username"]');
    this.passwordInput = By.xpath('//input[@id="password"]');
    this.loginBtn = By.xpath('//button[@id ="login-button"]');

    this.dropDownPath = {
      productType: '//div[@id ="dropdown_productType"]//input',
      partner: '//div[@id ="dropdown_client"]//input',
      status: '//div[@id ="dropdown_status"]//input',
      language: '//div[@id ="dropdown_language"]//input',
      state: '//div[@id ="dropdown_state"]//input',
      equifaxResponse: '//div[@id ="dropdown_efx-mock"]//input',
      milestone: '//div[@id ="dropdown_milestone"]//input'
    };

    this.inputPath = {
      borrowerEmail: '//input[@id ="borrowerEmail"]',
      salesRepEmail: '//input[@id ="salesRepEmail"]',
      referenceId: '//input[@id ="referenceId"]'
    };

    this.createButtonPath = By.xpath('(//button[@id ="button_create"])[2]');
    this.clickPartnerLinkPath = By.xpath(`//a[contains(@class,"__qa_row_partner-url")]`);
    this.loanpalLogoPath = By.xpath('//img[contains(@alt, "Loanpal Logo")]');
    this.loanpalAdminPath = By.xpath('//h6[contains(text(), "Loanpal Admin")]');

    this.username = process.env.adminUser;
    this.password = process.env.adminPass;
  }

  async open() {
    await this.openUrl(this.loginPageUrl);
    console.log('Opening URL', this.loginPageUrl);
  }

  async enterEmail(email) {
    if (email) this.username = email;
    const emailInput = await this.waitForElementLocated(this.emailInput, 5000);
    await this.enterText(emailInput, this.username);
    console.log('Email entered');
  }

  async enterPassword(password) {
    if (password) this.password = password;
    const passwordInput = await this.waitForElementLocated(this.passwordInput, 5000);
    await this.enterText(passwordInput, this.password);
    console.log('Password entered');
  }

  async loginClick() {
    const loginBtn = await this.waitForElementLocated(this.loginBtn, 5000);
    await loginBtn.click();
    console.log('Logging in');
  }

  async createNewLoan(loan) {
    await this.selectDropDown('productType', loan.productType);
    await this.selectDropDown('partner', loan.partner);
    await this.enterTheValues('referenceId', loan.referenceId);
    await this.selectDropDown('status', loan.status);
    await this.selectDropDown('language', loan.language);
    await this.selectDropDown('state', loan.state);
    await this.selectDropDown('equifaxResponse', loan.equifaxResponse);
    await this.enterTheValues('borrowerEmail', loan.borrowerEmail);
    await this.enterTheValues('salesRepEmail', loan.salesRepEmail);
    await this.selectDropDown('milestone', loan.milestone);
    await this.clickCreateButton();
    await this.clickPartnerLink();
  }

  async selectDropDown(key, dropDownText) {
    console.log('key', key);
    console.log('dropDownText', dropDownText);
    const dropDown = await this.waitForElementLocated(By.xpath(this.dropDownPath[key]), 5000);
    console.log('this.dropDownPath', this.dropDownPath[key]);
    await this.enterText(dropDown, dropDownText);

    await dropDown.sendKeys(Key.ENTER);
    await this.sleep(1000);
  }

  async enterTheValues(key, actualText) {
    const textfield = await this.waitForElementLocated(By.xpath(this.inputPath[key]), 5000);
    textfield.clear();
    await this.enterText(textfield, actualText);
    await this.sleep(1000);
  }

  async clickCreateButton() {
    const clickCreateButton = await this.waitForElementLocated(this.createButtonPath, 5000);
    await clickCreateButton.click();
  }

  async clickPartnerLink() {
    await this.waitForTarget(this.clickPartnerLinkPath);
    const clickPartnerLink = await this.waitForElementLocated(this.clickPartnerLinkPath, 5000);
    await clickPartnerLink.click();
  }

  async validateTheAdmin() {
    await this.waitForTarget(this.loanpalAdminPath);
    console.log('Admin Util login successful');
  }

  async validateThePPPage() {
    const handles = await this.getAllWindowHandles();
    if (handles.length > 1) await this.switchWindow(handles, 1);

    const validatePPLoginPage = await this.waitForElementLocated(this.loanpalLogoPath, 5000);
    return validatePPLoginPage;
  }

  async completeLogin() {
    await this.fullScreen();
    await this.open();
    await this.sleep(3000);
    await this.enterEmail();
    await this.enterPassword();
    await this.loginClick();
    await this.validateTheAdmin();
  }
}
