import BaseTest from "../../../src/base/baseTest";
import IPLoginPage from "../../../src/pages/investorPortal/ipLogin/ipLoginPage";
import each from "jest-each";

each(["chrome"]).describe("IP Login Test", browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test("Positive login test", async done => {
    const ipLoginPage = await new IPLoginPage(baseTest.webDriver, email, pass);
    await ipLoginPage.open();
    await ipLoginPage.enterEmail();
    await ipLoginPage.enterPassword();
    await ipLoginPage.loginClick();
    const logoutBtn = await ipLoginPage.validateLogin();
    expect(logoutBtn).toBeTruthy();
    done();
  }, 30000);

  each(require("../../../data/investorPortal/ipLogin/ipLogin.js")).test(
    "Negative login test",
    async ({ username, password, errorMessage }, done) => {
      const ipLoginPage = await new IPLoginPage(baseTest.webDriver);
      await ipLoginPage.open();
      await ipLoginPage.enterEmail(username);
      await ipLoginPage.enterPassword(password);
      await ipLoginPage.loginClick();
      await baseTest.webDriver.sleep(2000);
      const errorElem = await ipLoginPage.getErrorElement();
      const errorText = await errorElem.getAttribute("textContent");
      expect(errorText).toBe(errorMessage);
      done();
    },
    30000
  );
});
