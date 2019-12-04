import BaseTest from "../../../src/base/baseTest";
import IPLoginPage from "../../../src/pages/investorPortal/ipLogin/ipLoginPage";
import IPTranchesPage from "../../../src/pages/investorPortal/ipTranches/ipTranchesPage";
import each from "jest-each";
const { By, until } = require("selenium-webdriver");
describe.skip("Tranches", () => {
  let baseTest;
  beforeEach(async () => {
    baseTest = await new BaseTest("chrome");
    const ipLoginPage = await new IPLoginPage(baseTest.webDriver);
    await ipLoginPage.fullScreen();
    await ipLoginPage.open();
    await ipLoginPage.enterEmail();
    await ipLoginPage.enterPassword();
    await ipLoginPage.loginClick();
  }, 30000);

  afterEach(async () => {
    await baseTest.close();
  });

  //trancheOrder
  test("the rows should be in descending order", async done => {
    const ipTranchesPage = await new IPTranchesPage(baseTest.webDriver);
    const trancheRows = await ipTranchesPage.getTrancheRows();
    const trancheIds = await ipTranchesPage.getTrancheIds(trancheRows);
    const sortedTranche = trancheIds.sort().reverse();
    expect(trancheIds).toEqual(sortedTranche);
    done();
  }, 300000);

  // trancheTable
  test("all the headers should display", async done => {
    const validHeaders = [
      "Tranche ID",
      "Partner",
      "10 yr",
      "12 yr",
      "15 yr",
      "20 yr",
      "25 yr",
      "Total Loans",
      "Purchase Date",
      "Avg. FICO",
      "Avg. rate",
      "Org. Principal Amt"
    ];
    const ipTranchesPage = await new IPTranchesPage(baseTest.webDriver);
    const trancheHeaders = await ipTranchesPage.getTrancheHeaders();
    expect(validHeaders).toEqual(trancheHeaders);
    done();
  }, 300000);

  // trancheView
  test("the tranche view is displayed and the data is downloaded", async done => {
    const ipTranchesPage = await new IPTranchesPage(baseTest.webDriver);
    const trancheRows = await ipTranchesPage.getTrancheRows();
    const trancheIds = await ipTranchesPage.getTrancheIds(trancheRows);
    expect(trancheIds).toBeTruthy();
    const filesToValidate = await ipTranchesPage.downloadTranche(trancheIds);
    filesToValidate.forEach(item => {
      const { fileName, formattedName } = item;
      expect(fileName).toEqual(formattedName);
    });
    await ipTranchesPage.downloadTrancheDocs(trancheIds);
    done();
  }, 300000);
});
