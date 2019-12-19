/* eslint-disable guard-for-in */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';

require('dotenv').config();
const { By, Key } = require('selenium-webdriver');

each(['chrome']).describe('PP Login Test', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test('Logging in as BlueRaven Partner - Partner-Manager', async done => {
    const ppLoginPage = await new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.fullScreen();
    await ppLoginPage.open();
    await ppLoginPage.enterEmail(process.env.ppBlueRaven);
    await ppLoginPage.enterPassword(process.env.ppBlueRavenPass);
    await ppLoginPage.loginClick();
    await ppLoginPage.sleep(2000);

    const userManagementIconPath = By.xpath('//a[@title="Users"]');
    const userManagementIcon = await ppLoginPage.findElement(userManagementIconPath);
    userManagementIcon.click();
    console.log('user management icon clicked');
    await ppLoginPage.sleep(2000);

    const inviteButtonPath = By.xpath('//button[@id="inviteUserButton"]');
    const inviteButton = await ppLoginPage.findElement(inviteButtonPath);
    inviteButton.click();
    console.log('Invite Button is clicked');
    await ppLoginPage.sleep(2000);

    const addEmployeesPath = By.xpath('//h3[contains(text(),"Add Employees")]');
    await ppLoginPage.findElement(addEmployeesPath);
    console.log('Add Employees Modal Exists');
    await ppLoginPage.sleep(2000);

    // const body = By.xpath('//body');
    const selectUserRolePath = By.xpath('//div[contains(text(),"select or create")]/following-sibling::*//input');
    const selectUserRole = await ppLoginPage.findElement(selectUserRolePath);
    selectUserRole.sendKeys('partner-manager');
    await ppLoginPage.sleep(2000);
    selectUserRole.sendKeys(Key.ENTER);
    // const checkBody = await ppLoginPage.findElement(body);
    console.log('Select and Create User Group Drop Down Exist');
    await ppLoginPage.sleep(2000);

    const addEmailAddressTextPath = By.xpath('/html/body/div[3]/div/div[1]/div/div/div[1]/div/div[3]/label');
    await ppLoginPage.findElement(addEmailAddressTextPath);
    console.log('Add email addresses: Text Exist');
    await ppLoginPage.sleep(2000);

    const userEmailPath = By.xpath('/html/body/div[3]/div/div[1]/div/div/div[1]/div/div[3]/textarea');
    const userEmails = await ppLoginPage.findElement(userEmailPath);
    console.log('Email Text Area exists');
    const maxCount = 50;
    let sendKeyEmails = '';

    for (let i = 1; i <= maxCount; i++) {
      // console.log('num',i)
      sendKeyEmails +=`harmony.test+${i}@testemail.loanpal.com,`;
    }
    await userEmails.sendKeys(sendKeyEmails);
    await ppLoginPage.sleep(5000);

    const nextButtonPath = By.xpath('//button[contains(text(),"NEXT")]');
    const nextButton = await ppLoginPage.findElement(nextButtonPath);
    await nextButton.click();
    console.log('NEXT Button is Visible Enabled and Clicked');
    await ppLoginPage.sleep(2000);

    const sendInvitationLabelPath = By.xpath('//h3[contains(text(),"Send Invitation")]');
    await ppLoginPage.findElement(sendInvitationLabelPath);
    console.log('Send Invitation Label exists');
    await ppLoginPage.sleep(2000);

    const nextNewUsersAsPartnerManagerPath = By.xpath('/html/body/div[3]/div/div[1]/div/div/div[1]/div/div/label');
    await ppLoginPage.findElement(nextNewUsersAsPartnerManagerPath);
    console.log('NEXT button for entering New Users emal IDs for partner-manager');
    await ppLoginPage.sleep(2000);

    const emailAddressListLeftPanelPath = By.xpath('/html/body/div[3]/div/div[1]/div/div/div[1]/div/div/div[1]/label[1]');
    await ppLoginPage.findElement(emailAddressListLeftPanelPath);
    console.log('Email Address in Left Panel Exists');
    await ppLoginPage.sleep(2000);

    // const cancelInviteCheckMarkPath = By.xpath('/html/body/div[3]/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div/button/div/svg');
    // await ppLoginPage.findElement(cancelInviteCheckMarkPath);
    // console.log('Cancel Invite Label is present');

    const inviteButtonPath2 = By.xpath('//button[contains(text(),"INVITE")]');
    const inviteButton2 = await ppLoginPage.findElement(inviteButtonPath2);
    console.log('INVITE button Exists');
    await inviteButton2.click();
    await ppLoginPage.sleep(2000);


    const invitationSentPath = By.xpath('//h2[contains(text(),"Invitations Sent")]');
    await ppLoginPage.waitForTarget(invitationSentPath);
    await ppLoginPage.findElement(invitationSentPath);
    console.log('Invitations Sent');
    const finishButtonPath = By.xpath('//button[contains(text(),"FINISH")]');
    const finishButton = await ppLoginPage.findElement(finishButtonPath);
    await finishButton.click();
    await ppLoginPage.sleep(2000);

    done();
  }, 300000);
});
