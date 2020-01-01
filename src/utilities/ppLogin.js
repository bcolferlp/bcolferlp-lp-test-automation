import PPLoginPage from '../pages/partnerPortal/ppLogin/ppLoginPage';

async function loginForPP(baseTest, username, password) {
  const ppLoginPage = await new PPLoginPage(baseTest.webDriver);
  await ppLoginPage.fullScreen();
  await ppLoginPage.open();
  await ppLoginPage.enterEmail(username);
  await ppLoginPage.enterPassword(password);
  await ppLoginPage.loginClick();
  await ppLoginPage.sleep(2000);
}

module.exports.loginForPP = loginForPP;
