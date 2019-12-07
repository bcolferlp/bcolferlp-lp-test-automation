import BasePageObject from '../../../base/basePageObject';

const { By } = require('../../../utilities/imports');

export default class IPProfilePage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.url = `${process.env.investorPortal}/profile`;
    // Xpath
    this.username = By.xpath('//*[contains(text(), "Username")]/..//p');
    this.firstname = By.xpath('//div[contains(@class,"__qa_div_firstName")]//input');
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
  }

  async goToProfilePage() {
    // Navigate to profile settings page
    console.log('Go to profile settings');
    await this.sleep(2000);
    await this.openUrl(this.url);
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
    await this.waitForURL(this.url);
    console.log('Logged out successfully');
  }

  async verifyClient() {
    const currentClient = await this.waitForElementLocated(this.formControlClient, 10000);
    const currentClientText = await currentClient.getText();
    return currentClientText;
  }
}
