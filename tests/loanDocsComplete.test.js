import BaseTest from "../src/base/baseTest";
import EmailPage from "../src/pages/3rdParty/email/emailPage";
import DocuSignPage from "../src/pages/3rdParty/docuSign/docuSignPage";

describe("Loan Docs Completion", () => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest("chrome");
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test("Log into email and complete the loan docs", async done => {
    const emailPage = await new EmailPage(baseTest.webDriver);
    const docuSignPage = await new DocuSignPage(baseTest.webDriver);
    // Email
    await emailPage.fullScreen();
    await emailPage.goToEmail();
    await emailPage.emailLogin();
    await emailPage.getDocuSignEmail();
    // DocuSign
    await docuSignPage.completeDocs();
    await docuSignPage.closeTabs();
    // Email
    await emailPage.deleteMail();
    await emailPage.emailLogout();
    done();
  }, 300000);
});
