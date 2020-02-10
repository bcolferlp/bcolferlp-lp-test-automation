import BasePageObject from '../../../base/basePageObject';
import {
  CSV_HEADERS,
  LOAN_STATUS_KEYS_TO_DELETE,
  DATE_KEYS,
  HEADERS_TO_TRUNCATE,
  TODAY_DATES,
  TEST_DATA_FILE_KEY,
  TBD_KEYS,
  TEST_FILE_KEY_MAPPING
} from '../../../../data/uwPortal/uwFunding/fundingFileData';
import LoanData from '../../../utilities/loanData';
import S3API from '../../../apis/s3API';
import CSVParser from '../../../utilities/parseCSV';

const csv = require('fast-csv');
const { By, urls, error } = require('../../../utilities/imports');
const { validSolarLoanIds, readyToFundAfter4pmLoanIds } = require('../../../../data/uwPortal/uwFunding/loanIds');

export default class UWFundingPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.url = urls.underwriterPortal;
    this.s3 = new S3API(`${process.env.STAGE}-core.loanpal.com`);
    this.csv = new CSVParser();
    // XPath
    this.button = {
      pregenerateGoldman: By.xpath('//button[contains(@class,"__qa_GenerateButton_PreGenerateGoldman")]'),
      generateFunding: By.xpath('//button[contains(@class,"__qa_GenerateButton_GenerateFundingFiles")]')
    };
    this.checkbox = {
      loanId: By.xpath('//td[contains(@class, "__qa_SingleRow_Pregenerate_checkbox")]//input[@type="checkbox"]')
    };
    this.td = {
      gsFileS3Key: By.xpath('//tr[contains(@class, "__qa_TableFiles_TodaysGoldmanFiles_row")]/*[contains(text(), "csv")]')
    };
  }

  async getFundingPage() {
    await this.openUrl(`${this.url}/finance`);
  }

  formatLoanId(loanId) {
    console.log('formatLoanId', loanId);
    const replacedId = loanId.replace(/[^0-9]+/g, '');
    return `${replacedId.slice(0, 2)}-${replacedId.slice(2, 4)}-${replacedId.slice(4)}`;
  }

  getTestFileKey(key) {
    const testKey = TEST_FILE_KEY_MAPPING[key];
    return testKey || key;
  }

  getDateToday() {
    console.log('getDateToday');
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    const y = today.getFullYear();
    const dateString = `${m}/${d}/${y}`;
    return new Date(dateString);
  }

  async makeLoansReady() {
    console.log('Rolling back loans to "Ready to Fund" status.');
    const solarAndPoolLoanIds = [...validSolarLoanIds];

    const promises = solarAndPoolLoanIds.map(async loanId => {
      const loanData = new LoanData(loanId);
      const loan = await loanData.getSrcLoan();
      const { loanStatus } = loan;
      LOAN_STATUS_KEYS_TO_DELETE.forEach(key => {
        if (Object.prototype.hasOwnProperty.call(loanStatus, key)) {
          delete loanStatus[key];
        }
      });
      loanStatus.application = 'Approved';
      // set credit expiration to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      loanStatus.creditExpiresAt = tomorrow.toISOString();
      loan.loanStatus = loanStatus;
      await loanData.putLoan(loan);
    });

    promises.push(
      ...readyToFundAfter4pmLoanIds.map(async loanId => {
        const loanData = new LoanData(loanId);
        const loan = await loanData.getSrcLoan();
        const { loanStatus } = loan;
        LOAN_STATUS_KEYS_TO_DELETE.forEach(key => {
          if (Object.prototype.hasOwnProperty.call(loanStatus, key)) {
            delete loanStatus[key];
          }
        });
        loanStatus.application = 'Approved';
        // set credit expiration to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        loanStatus.creditExpiresAt = tomorrow.toISOString();
        // Create after cutoff date for today
        const afterCutoff = new Date();
        // set time to 4:30pm
        afterCutoff.setHours(16);
        afterCutoff.setMinutes(30);
        loanStatus.readyToFundMilestoneOneAt = afterCutoff.toISOString();
        loan.loanStatus = loanStatus;
        await loanData.putLoan(loan);
      })
    );

    await Promise.all(promises);
    // Sleep for 5 seconds so that changes have a chance to propogate to ElasticSearch
    await this.sleep(5000);
  }

  async clickGoldmanPreGenButton() {
    console.log('clickGoldmanPreGenButton');
    const preGenButton = await this.waitForElementLocated(this.button.pregenerateGoldman, 5000);
    await preGenButton.click();
  }

  async getLoanIds() {
    console.log('getLoanIds');
    const loanIdCheckboxes = await this.waitForElementsLocated(this.checkbox.loanId, 10000);
    const uncheckedLoanIds = [];
    const checkedLoanIds = [];
    await Promise.all(
      loanIdCheckboxes.map(async element => {
        const checked = await element.isSelected();
        const loanLink = await element.findElement(By.xpath('./../../../td[2]/a'));
        const loanId = await loanLink.getText();
        if (checked) {
          checkedLoanIds.push(loanId);
        } else {
          uncheckedLoanIds.push(loanId);
        }
      })
    );
    return { checkedLoanIds, uncheckedLoanIds };
  }

  async clickGoldmanGenButton() {
    console.log('clickGoldmanGenButton');
    let initialCellCount;
    try {
      const gsFileS3KeyCells = await this.waitForElementsLocated(this.td.gsFileS3Key, 5000);
      initialCellCount = gsFileS3KeyCells.length;
    } catch (e) {
      if (e instanceof error.TimeoutError) {
        initialCellCount = 0;
      } else {
        throw e;
      }
    }

    const genButton = await this.waitForElementLocated(this.button.generateFunding, 5000);
    await genButton.click();

    let currentCellCount = initialCellCount;
    /* eslint-disable no-await-in-loop */
    while (initialCellCount === currentCellCount) {
      try {
        const currentGsFileS3KeyCells = await this.waitForElementsLocated(this.td.gsFileS3Key, 5000);
        currentCellCount = currentGsFileS3KeyCells.length;
      } catch (e) {
        if (!(e instanceof error.TimeoutError)) {
          throw e;
        }
      }
    }
  }

  async verifyCsvGeneration() {
    console.log('verifyCsvGeneration');
    const gsFileS3KeyCells = await this.waitForElementsLocated(this.td.gsFileS3Key, 5000);
    const currentGsFileS3Key = await gsFileS3KeyCells[gsFileS3KeyCells.length - 1].getText();
    return currentGsFileS3Key;
  }

  async downloadCsvFile(key) {
    console.log('downloadCsvFile', key);
    const fileBufferString = await this.s3.downloadFileFromS3AsString(key);
    return fileBufferString;
  }

  async verifyCsvHeaders(fileBufferString) {
    console.log('verifyCsvHeaders');
    const headers = await this.csv.getCsvHeaders(fileBufferString);
    return headers;
  }

  async verifyCsvLoanIds(fileBufferString) {
    console.log('verifyCsvLoanIds');
    return new Promise((resolve, reject) => {
      try {
        const loanIds = [];
        const csvStream = csv.parseString(fileBufferString, { headers: true });
        csvStream
          .on('data', data => {
            loanIds.push(this.formatLoanId(data['LD LoanID']));
          })
          .on('end', () => resolve(loanIds));
      } catch (e) {
        return reject(e);
      }
    });
  }

  async verifyCsvValues(fileBufferString) {
    console.log('verifyCsvValues');
    const testFileString = await this.s3.downloadFileFromS3AsString(TEST_DATA_FILE_KEY);

    const gsFileLoanIdDataMap = {};
    const testFileLoanIdDataMap = {};

    await Promise.all([
      new Promise((resolve, reject) => {
        try {
          const csvStream = csv.parseString(fileBufferString, { headers: true });
          csvStream
            .on('data', row => {
              const loanId = this.formatLoanId(row['LD LoanID']);
              if (validSolarLoanIds.includes(loanId)) {
                const data = {};
                CSV_HEADERS.forEach(header => {
                  let value;
                  if (DATE_KEYS.includes(header)) {
                    value = new Date(row[header]).toLocaleDateString('en-US');
                  } else {
                    value = row[header];
                  }
                  if (header === 'Zip') {
                    if (value.length === 4) {
                      value = `0${value}`;
                    }
                  }
                  if (HEADERS_TO_TRUNCATE.includes(header)) {
                    try {
                      value = parseFloat(value, 10).toFixed(2);
                    } catch (e) {
                      // Let value stay the same if it isn't an integer
                    }
                  }
                  value = value.trim();
                  data[header] = value;
                });
                gsFileLoanIdDataMap[loanId] = data;
              }
            })
            .on('end', () => resolve());
        } catch (e) {
          return reject(e);
        }
      }),
      new Promise((resolve, reject) => {
        try {
          const csvStream = csv.parseString(testFileString, { headers: true });
          csvStream
            .on('data', row => {
              const loanId = row.LoanID;
              if (validSolarLoanIds.includes(loanId)) {
                const data = {};
                console.log('getTestFileKey...');
                CSV_HEADERS.forEach(header => {
                  const key = this.getTestFileKey(header);
                  let value;
                  if (DATE_KEYS.includes(key)) {
                    if (TODAY_DATES.includes(key)) {
                      value = this.getDateToday().toLocaleDateString('en-US');
                    } else {
                      value = new Date(row[key]).toLocaleDateString('en-US');
                    }
                  } else if (TBD_KEYS.includes(header)) {
                    value = 'TO BE DETERMINED';
                  } else {
                    value = row[key];
                  }
                  if (header === 'Zip') {
                    if (value.length === 4) {
                      value = `0${value}`;
                    }
                  }
                  if (HEADERS_TO_TRUNCATE.includes(header)) {
                    try {
                      value = parseFloat(value, 10).toFixed(2);
                    } catch (e) {
                      // Let value stay the same if it isn't an integer
                    }
                  }
                  value = value.trim();
                  data[header] = value;
                });
                testFileLoanIdDataMap[loanId] = data;
              }
            })
            .on('end', () => resolve());
        } catch (e) {
          return reject(e);
        }
      })
    ]);

    return { gsFileLoanIdDataMap, testFileLoanIdDataMap };
  }
}
