import BasePageObject from '../../../base/basePageObject';

const { By, Key } = require('selenium-webdriver');
require('dotenv').config();

export default class UserPermission extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // Url
    this.loginPageUrl = process.env.partnerPortal;
    // Xpath
    this.emailInput = By.xpath('//input[@id="username"]');
    this.passwordInput = By.xpath('//input[@id="password"]');
    this.loginBtn = By.xpath('//*[@id="form-access"]/form/div/button');
    this.logoutBtn = By.xpath('//a[@title="Logout"]');
    this.logoutConf = By.xpath('//button[contains(text(),"Let me in")]');
    this.errorMessage = By.xpath('//div[@id="errorMessage"]');
    this.userManagementIconPath = By.xpath('//a[@title="Users"]');
    this.inviteButtonPath = By.xpath('//button[@id="inviteUserButton"]');
    this.addEmployeesPath = By.xpath('//h3[contains(text(),"Add Employees")]');
    this.selectUserRolePath = By.xpath('//div[contains(text(),"select or create")]/following-sibling::*//input');
    this.userEmailPath = By.xpath('//textarea[contains(@placeholder, "user@company.com")]');
    this.nextButtonPath = By.xpath('//button[contains(text(),"NEXT")]');
    this.sendInvitationLabelPath = By.xpath('//h3[contains(text(),"Send Invitation")]');
    this.nextNewUsersAsPartnerManagerPath = By.xpath('//label[contains(text(),"Inviting")]');
    this.emailAddressListLeftPanelPath = By.xpath('//label[contains(text(),"Email Address")]');
    this.sendInvitationInviteButtonPath = By.xpath('//button[contains(text(),"INVITE")]');
    this.invitationSentPath = By.xpath('//h2[contains(text(),"Invitations Sent")]');
    this.finishButtonPath = By.xpath('//button[contains(text(), "FINISH")]');
    this.validateTheLoginPath = By.xpath('//img[contains(@alt, "Loanpal Logo")]');

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

  async validateTheLogin() {
    const validateTheLogin = await this.waitForTarget(this.validateTheLoginPath, 5000);
    console.log('Login validated');
    return validateTheLogin;
  }

  async validateUserRoles(userRoles) {
    await this.validateUserRolesActions(userRoles);
  }

  async validateUserRolesActions(userRoles) {
    const userManagementIcon = await this.waitForElementLocated(this.userManagementIconPath, 5000);
    await userManagementIcon.click();
    console.log('User management icon clicked');

    await this.waitForTarget(this.inviteButtonPath);
    const inviteButton = await this.waitForElementLocated(this.inviteButtonPath, 5000);
    await inviteButton.click();
    console.log('Invite Button is clicked');

    await this.waitForTarget(this.addEmployeesPath);
    console.log('Add Employees Modal Exists');

    const selectUserRole = await this.waitForElementLocated(this.selectUserRolePath, 5000);
    await this.enterText(selectUserRole, userRoles);

    await selectUserRole.sendKeys(Key.ENTER);
    console.log('Select and Create User Group Drop Down Exist');

    const userEmails = await this.waitForElementLocated(this.userEmailPath, 5000);
    console.log('Email Text Area exists');
    const maxCount = 10;
    let sendKeyEmails = '';

    for (let i = 1; i <= maxCount; i++) {
      // console.log('num',i)
      sendKeyEmails += `harmony.test+${i}@testemail.loanpal.com,`;
    }
    await this.enterText(userEmails, sendKeyEmails);

    const nextButton = await this.waitForElementLocated(this.nextButtonPath, 5000);
    await nextButton.click();
    console.log('NEXT Button is Visible Enabled and Clicked');

    await this.waitForElementLocated(this.sendInvitationLabelPath, 5000);
    console.log('Send Invitation Label exists');

    await this.waitForElementLocated(this.nextNewUsersAsPartnerManagerPath, 5000);
    console.log(`NEXT button for entering New Users emal IDs for ${userRoles}`);

    await this.waitForElementLocated(this.emailAddressListLeftPanelPath, 5000);
    console.log('Email Address in Left Panel Exists');

    const sendInvitationInviteButton = await this.waitForElementLocated(this.sendInvitationInviteButtonPath, 5000);
    console.log('INVITE button Exists');
    await sendInvitationInviteButton.click();

    await this.waitForTarget(this.invitationSentPath);
    console.log('Invitations Sent');
    const finishButton = await this.waitForElementLocated(this.finishButtonPath, 5000);
    await finishButton.click();
  }

  async completeLogin() {
    await this.fullScreen();
    await this.open();
    await this.sleep(3000);
    await this.enterEmail(process.env.ppBlueRaven);
    await this.enterPassword(process.env.ppBlueRavenPass);
    await this.loginClick();
    await this.validateTheLogin();
  }
}
