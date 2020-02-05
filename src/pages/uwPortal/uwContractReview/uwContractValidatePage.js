import Aurora from '../../../utilities/aurora';
import LoanData from '../../../utilities/loanData';

class UWContractValidatePage {
  constructor(loanId) {
    this.loanId = loanId;
  }

  async verifyDynamo() {
    const loanData = new LoanData(this.loanId);
    const dynaContract = await loanData.getContractReview();
    console.log('Got Dynamo Contract Review record');
    return dynaContract;
  }

  async verifyAurora() {
    const sqlQuery = `SELECT * FROM ${process.env.STAGE}.cf_contract_review where loanid='${this.loanId}'`;
    const aurora = new Aurora(sqlQuery);
    const auroraContract = await aurora.getPayload();
    console.log('Got Aurora Contract Review record:');
    return auroraContract;
  }

  async verifyRecords(dynamo, aurora) {
    const { loanId: dLoan = '', timestamp = '' } = dynamo;
    const { loanid: aLoan = '', createddt = '' } = aurora;
    const dynamoDate = new Date(timestamp);
    const auroraDate = new Date(createddt);

    return {
      dLoan,
      aLoan,
      dynamoDate,
      auroraDate
    };
  }
}

module.exports = UWContractValidatePage;
