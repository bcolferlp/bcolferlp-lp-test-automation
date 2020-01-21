import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class IPProfilePage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.url = `${urls.investorPortal}/profile`;
    this.logoutVerify = `${urls.investorPortal}/login`;
    // Xpath
    this.username = By.xpath('//*[contains(text(), "Username")]/..//p');
    this.firstName = By.xpath('//div[contains(@class,"__qa_div_firstName")]//input');
    this.lastName = By.xpath('//div[contains(@class,"__qa_div_lastName")]//input');
    this.fullName = By.xpath('//div[contains(@class,"__qa_div_fullName")]//input');
    this.phone = By.xpath('//div[contains(@class,"__qa_div_phoneNumber")]//input');
    this.oldPassword = By.xpath('//*[@id="oldPassword"]');
    this.newPassword = By.xpath('//*[@id="newPassword"]');
    this.confirmNewPassword = By.xpath('//*[@id="confirmPassword"]');
    this.saveChanges = By.xpath('//button[contains(@class, "__qa_div_saveProfileChanges")]');
    this.saveNewPassword = By.xpath('//button[contains(text(), "Save New Password")]');
    this.logout = By.xpath('//a[@data-tip="Logout"]');
    this.clientId = By.xpath('//div[@aria-haspopup="true"]');
    this.listedClient = text => {
      return By.xpath(`//li[@data-value="${text}"]`);
    };
    this.clientChangeElem = By.xpath('//div[@role="alert"]');
    this.clientChangeText = 'Warning!\nYou will be automatically logged out and you will need to login again for changes to take effect.';
    this.formControlClient = By.xpath('//div[contains(@class, "_qa_FormControl_generalSwitchToggle")]//label');
    this.profileTarget = By.xpath('//h4[contains(text(), "Profile Settings")]');
    this.settingsSaveMessage = By.xpath('//div[contains(text(), "Settings Saved!")]');
    this.validateText = text => By.xpath(`//input[contains(@value, "${text}")]`);
  }

  async goToProfilePage() {
    // Navigate to profile settings page
    console.log('Go to profile settings');
    await this.openUrl(this.url);
    await this.waitForTarget(this.profileTarget);
  }

  async standardUserClient() {
    const clientSelector = await this.findElements(this.clientId);
    return clientSelector;
  }

  async selectClient(clientId, clientVerify) {
    const currentClient = await this.waitForElementLocated(this.formControlClient, 10000);
    const currentClientText = await currentClient.getText();
    // console.log(`${clientId} ${currentClientText}`);
    if (clientVerify !== currentClientText) {
      // Click Client ID dropdown
      const clientSelector = await this.waitForElementLocated(this.clientId, 10000);
      await clientSelector.click();
      await this.sleep(1000);
      // Select client id from dropdown
      const clientOption = await this.waitForElementLocated(this.listedClient(clientId), 5000);
      await clientOption.click();
      // Locate warning message
      const clientWarning = await this.waitForElementLocated(this.clientChangeElem, 5000);
      // Verify warning messgae text
      const clientWarningText = await clientWarning.getText();
      return {
        cwText: clientWarningText,
        ccText: this.clientChangeText,
        change: true
      };
    }
    console.log('Current Client');
    return {
      cwText: clientVerify,
      ccText: currentClientText,
      change: false
    };
  }

  async clickSaveChanges(change) {
    if (change) {
      await this.sleep(1000);
      const saveChangesBtn = await this.waitForElementLocated(this.saveChanges, 5000);
      await saveChangesBtn.click();
      console.log('Save Changes Click');
    } else {
      await this.sleep(1000);
      const logoutBtn = await this.waitForElementLocated(this.logout, 5000);
      await logoutBtn.click();
    }
  }

  async verifyLogout() {
    await this.waitForURL(this.logoutVerify);
    console.log('Logged out successfully');
  }

  async verifyClient() {
    const currentClient = await this.waitForElementLocated(this.formControlClient, 10000);
    const currentClientText = await currentClient.getText();
    return currentClientText;
  }

  async changeClient({ clientId, clientVerify }) {
    await this.goToProfilePage();
    const clientResults = await this.selectClient(clientId, clientVerify);
    await this.clickSaveChanges(clientResults.change);
    await this.verifyLogout();
  }

  async verifyUserName() {
    const userName = await this.waitForElementLocated(this.username, 5000);
    const userNametext = await userName.getText();
    return userNametext;
  }

  async enterPersonalData(data) {
    const { firstName, lastName, fullName, phone } = data;
    const firstNameInput = await this.waitForElementLocated(this.firstName, 5000);
    const lastNameInput = await this.waitForElementLocated(this.lastName, 5000);
    const fullNameInput = await this.waitForElementLocated(this.fullName, 5000);
    const phoneInput = await this.waitForElementLocated(this.phone, 5000);
    const saveChangesBtn = await this.waitForElementLocated(this.saveChanges, 5000);

    await firstNameInput.clear();
    await this.enterText(firstNameInput, firstName);
    await lastNameInput.clear();
    await this.enterText(lastNameInput, lastName);
    await fullNameInput.clear();
    await this.enterText(fullNameInput, fullName);
    await phoneInput.clear();
    await this.enterText(phoneInput, phone);

    await saveChangesBtn.click();
    await this.waitForTarget(this.settingsSaveMessage);
    const settingsSavedMessage = await this.waitForElementLocated(this.settingsSaveMessage, 5000);
    const savedMessageText = await settingsSavedMessage.getText();
    return savedMessageText;
  }

  async validatePersonalData(data) {
    const { firstName, lastName, fullName, phone } = data;
    await this.waitForElementLocated(this.validateText(firstName), 5000);
    await this.waitForElementLocated(this.validateText(lastName), 5000);
    await this.waitForElementLocated(this.validateText(fullName), 5000);
    await this.waitForElementLocated(this.validateText(phone), 5000);
  }
}
