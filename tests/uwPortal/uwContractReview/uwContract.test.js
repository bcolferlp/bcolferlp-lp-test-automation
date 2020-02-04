import BaseTest from '../../../src/base/baseTest';
import UWLoginPage from '../../../src/pages/uwPortal/uwLogin/uwLoginPage';

require('dotenv').config();

jest.setTimeout(60000 * 5);
describe('Underwriter Contract Review', () => {
  let baseTest;
  let uwPage;

  beforeEach(async () => {
    baseTest = new BaseTest('chrome');
    uwPage = new UWLoginPage(baseTest.webDriver);
    await uwPage.completelogin();
  });

  afterEach(async () => {
    await baseTest.close();
  });

  afterAll(async () => {
    await baseTest.quit();
  });

  test('Login as an existing user', async () => {});
});
