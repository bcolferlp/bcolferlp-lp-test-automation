import BaseTest from "../src/base/baseTest";
import EmailPage from "../src/pages/3rdParty/emailPage";
import DocuSignPage from "../src/pages/3rdParty/docuSignPage";
const { By, until } = require("selenium-webdriver");

describe("Loan Docs Completion", () => {
  let baseTest;
  const emailRow = By.xpath('(//*[contains(text(),"Please sign your Solar Loan Docs")])[1]');
  const reviewDocs = By.xpath('//span[contains(text(), "REVIEW")]/../../a');

  beforeEach(async () => {
    baseTest = await new BaseTest("chrome");
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test("Log into email and complete the loan docs", async done => {
    const emailPage = await new EmailPage(baseTest.webDriver);
    await emailPage.fullScreen();
    const docuSignPage = await new DocuSignPage(baseTest.webDriver);
    await emailPage.goToEmail();
    await emailPage.emailLogin();
    await emailPage.findEmail(emailRow);
    await emailPage.findEmailLink(reviewDocs);
    await docuSignPage.completeDocs();
    await docuSignPage.closeTabs(baseTest.webDriver);
    await emailPage.emailLogout();
    done();
  }, 120000);
});
