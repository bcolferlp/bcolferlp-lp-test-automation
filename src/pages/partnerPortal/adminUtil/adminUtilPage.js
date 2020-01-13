import BasePageObject from '../../../base/basePageObject';


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

    this.username = process.env.adminUser;
    this.password = process.env.adminPass;
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

  async createNewLoan() {
    // await this.selectDropDown('Solar', 'Solar');
    await this.selectDropDown('Loanpal', 'BlueRaven');
    await this.enterText('referenceId', 'HARM-AUTOMATION');
    await this.selectDropDown('Approved', 'Approved');
    await this.selectDropDown('English', 'English');
    await this.selectDropDown('California', 'California');
    await this.selectDropDown('Use UAT - no mock', '800.json');
    await this.enterText('borrowerEmail', 'PRavichandran@loanpal.com');
    await this.enterText('salesRepEmail', 'PRavichandran@loanpal.com');
    await this.selectDropDown('Submitted', 'Docs Complete');
    await this.clickButton('button_create');
    await this.clickPartnerLink('__qa_row_partner-url');
  }


  async selectDropDown(dropDownID, dropDownText) {
    const dropDownPath = By.xpath(`//div[contains(text(),"${dropDownID}")]/following-sibling::*//input`);
    await this.waitForTarget(dropDownPath);
    const dropDown = await this.findElement(dropDownPath);
    dropDown.sendKeys(`${dropDownText}`);
    await this.sleep(200);
    dropDown.sendKeys(Key.ENTER);
    await this.sleep(200);
  }

  async enterText(textID, actualText) {
    const textPath = By.xpath(`//input[@id = "${textID}"]`);
    const textfield = await this.findElement(textPath);
    textfield.clear();
    textfield.sendKeys(`${actualText}`);
    await this.sleep(200);
  }

  async clickButton(buttonClickID) {
    const clickButtonPath = By.xpath(`(//button[@id="${buttonClickID}"])[2]`);
    const clickButton = await this.findElement(clickButtonPath);
    await clickButton.click();
   
  }

  async clickPartnerLink(clickPPLink) {
    const clickPartnerLinkPath = By.xpath(`(//a[contains(@class,"${clickPPLink}")])[1]`);
    await this.waitForTarget(clickPartnerLinkPath);
    const clickPartnerLink = await this.findElement(clickPartnerLinkPath);
    await clickPartnerLink.click();
    await this.sleep(200);
  }

  async validateThePPPage()
  {
      const loanpalLogoPath = By.xpath('//img[contains(@alt, "Loanpal Logo")]');
      await this.waitForTarget(loanpalLogoPath);
      console.log('PP login successful');
      await this.sleep(200);
  }
}
