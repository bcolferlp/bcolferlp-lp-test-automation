const LoanData = require('./loanData');

const loanId = '19-08-000939';

async function getLoan() {
  const loanData = new LoanData(loanId);
  const info = await loanData.getEnvelopeId();
  console.log(info);
}

getLoan();
