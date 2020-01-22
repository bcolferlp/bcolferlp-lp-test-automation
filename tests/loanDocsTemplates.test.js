import LoanData from '../src/utilities/loanData';
import DocuSignAPI from '../src/apis/docuSignAPI';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';

const { _ } = require('../src/utilities/imports');

jest.setTimeout(60000 * 5);

describe('Loan Doc Templates', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();

  const allLoans = _.concat([], loanSingleBorrSunRun, loanSingleBorrNonSunRun, loanCoBorrSunRun, loanCoBorrNonSunRun);

  test.each(allLoans)('90475: DocuSign Configuration - Expiration Days for Template', async ({ loanId, firstName }) => {
    console.log('Checking Expiration docs for', firstName);
    const loanData = new LoanData(loanId);
    const envelopeId = await loanData.getEnvelopeId();
    console.log(envelopeId);
    const docuSignAPI = new DocuSignAPI(envelopeId);
    const { templates } = await docuSignAPI.getAllTemplates();

    for (const temp of templates) {
      const template = await docuSignAPI.getDocTemplate(temp.templateId);
      const exp = template.notification.expirations.expireAfter;
      console.log(`Name: ${temp.name}, ID: ${temp.templateId}, Expiration: ${exp}`);
      expect(`Name: ${temp.name}, ID: ${temp.templateId}, Expiration: ${exp}`).toBe(`Name: ${temp.name}, ID: ${temp.templateId}, Expiration: 360`);
    }
  });
});
