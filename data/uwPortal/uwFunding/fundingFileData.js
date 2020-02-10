const CSV_HEADERS = [
  'As of Date',
  'LD LoanID',
  'Product Type',
  'Original Loan Amount',
  'Loan Product',
  'Loan Term (Months)',
  'Interest Rate',
  'APR',
  'Credit Application Date',
  'Origination Date',
  'ACH Enrolled Flag',
  'Borrower Months Since Most Recent Bankruptcy',
  'Co-Borrower Months Since Most Recent Bankruptcy',
  'Borrower Months Since Most Recent Foreclosure',
  'Co-Borrower Months Since Most Recent Foreclosure',
  'Borrower Number of 1x30 Mortgage Lates in Past 12 Months',
  'Co-Borrower Number of 1x30 Mortgage Lates in Past 12 Months',
  'Borrower Number of 1x90 Revolving or Installment Lates in Past 12 Months',
  'Co-Borrower Number of 1x90 Revolving or Installment Lates in Past 12 Months',
  'Borrower FICO',
  'Co-Borrower FICO',
  'Qualifying FICO',
  'Borrower Income Used to Qualify',
  'Co-Borrower Income Used to Qualify',
  'Total Monthly Income Used to Qualify',
  'Qualifying DTI',
  'PTI',
  'Installer',
  'Installation Date',
  'Module Manufacturer',
  'Inverter Manufacturer',
  'Battery Manufacturer',
  'Committed Takeout Price',
  'Address',
  'Zip',
  'City',
  'State',
  'Requested Amount',
  'Funding Requested Date'
];

const TEST_FILE_KEY_MAPPING = {
  Address: 'Residence Address 1',
  'Borrower Number of 1x90 Revolving or Installment Lates in Past 12 Months': 'Borrower Number of 90+ in last 12 months',
  'Co-Borrower Number of 1x90 Revolving or Installment Lates in Past 12 Months': 'Co-Borrower Number of 90+ in last 12 months',
  PTI: 'Payment To Income',
  Zip: 'Zip Code'
};

const DATE_KEYS = ['Installation Date', 'Origination Date', 'Credit Application Date', 'As of Date', 'Funding Requested Date'];

const TODAY_DATES = ['As of Date', 'Funding Requested Date'];

const HEADERS_TO_TRUNCATE = ['Total Monthly Income Used to Qualify', 'Qualifying DTI', 'PTI'];

const TBD_KEYS = ['Committed Takeout Price', 'Requested Amount'];

const TEST_DATA_FILE_KEY = 'Testing/Funding/GS/Loanpal-data-dump-20190708113528_DEV (1).csv';

const LOAN_STATUS_KEYS_TO_DELETE = [
  'bookedAt',
  'bookingRequestedAt',
  'fundedMilestoneOneAt',
  'fundingRequestedMilestoneOneAt',
  'soldAt',
  'soldTo',
  'welcomeCallCompletedAt',
  'welcomeCallPendingAt',
  'welcomeLetterSentAt',
  'welcomeLetterVaultedAt'
];

module.exports = {
  CSV_HEADERS,
  TEST_FILE_KEY_MAPPING,
  DATE_KEYS,
  TODAY_DATES,
  HEADERS_TO_TRUNCATE,
  TBD_KEYS,
  TEST_DATA_FILE_KEY,
  LOAN_STATUS_KEYS_TO_DELETE
};
