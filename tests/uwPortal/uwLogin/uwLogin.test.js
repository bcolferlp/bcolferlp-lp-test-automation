import BaseTest from '../../../src/base/baseTest';
import UWLoginPage from '../../../src/pages/uwPortal/uwLogin/uwLoginPage';

require('dotenv').config();

jest.setTimeout(60000 * 5);
describe('Underwriter Portal Login', () => {
  let baseTest;
  let uwPage;

  beforeEach(() => {
    baseTest = new BaseTest('chrome');
    uwPage = new UWLoginPage(baseTest.webDriver);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  afterAll(async () => {
    await baseTest.quit();
  });

  test('97877: Login as an existing user', async () => {
    await uwPage.completelogin();
  });

  test.each([
    { email: process.env.testEmail, password: 'BadPassword' },
    { email: 'badEmail@email.com', password: process.env.emailPass }
  ])('97878: Informed when login information is incorrect', async ({ email, password }) => {
    const message = 'The Username or Password are invalid. Please try again!';
    await uwPage.fullScreen();
    await uwPage.open();
    await uwPage.enterEmail(email);
    await uwPage.enterPassword(password);
    await uwPage.loginClick();
    const errorText = await uwPage.validateMessage(message);
    expect(errorText).toBeTruthy();
  });
});
