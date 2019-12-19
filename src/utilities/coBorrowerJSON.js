const jsonload = require('jsonload');

export default class CoBorrowerJSON {
  constructor() {
    this.jsonFile = '../../data/loanDocs/newLoanTemplatesJSON/coBorrowerLoan.json';
  }

  updateJson(
    productType,
    language,
    state,
    client,
    borrowerFname,
    borrowerLname,
    address,
    borrowerEmail,
    coboFname,
    coboLname,
    coboAddress,
    coboState,
    coboEmail,
    salesRepEmail,
    bucket,
    key
  ) {
    const jsonData = jsonload.sync(this.jsonFile);
    jsonData.overrideResponse.Bucket = bucket;
    jsonData.overrideResponse.Key = key;
    jsonData.productType = productType;
    jsonData.clientId = client;
    jsonData.applicant.firstName = borrowerFname;
    jsonData.applicant.lastName = borrowerLname;
    jsonData.applicant.address.street = address;
    jsonData.applicant.address.state = state;
    jsonData.applicant.email = borrowerEmail;
    jsonData.applicant.spokenLanguage = language;
    jsonData.salesRep.email = salesRepEmail;
    // co applicant
    jsonData.coApplicants[0].firstName = coboFname;
    jsonData.coApplicants[0].lastName = coboLname;
    jsonData.coApplicants[0].address.street = coboAddress;
    jsonData.coApplicants[0].email = coboEmail;
    jsonData.coApplicants[0].address.state = coboState;
    return jsonData;
  }
}
