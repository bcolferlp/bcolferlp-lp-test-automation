/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { fs, path } = require('./imports');

const folderResults = path.join(__dirname, '../../data/loanDocs/testResults/');

class LoanDocsResultsFiles {
  constructor() {
    this.testNumber = fs.readFileSync(`${folderResults}latestTestNumber.txt`).toString();
  }

  getLoanSingleBorrSunRun() {
    const loanSingleBorrSunRun = require(`${folderResults}${this.testNumber}/loanSingleBorrSunRun.json`);
    return loanSingleBorrSunRun;
  }

  getLoanSingleBorrNonSunRun() {
    const loanSingleBorrNonSunRun = require(`${folderResults}${this.testNumber}/loanSingleBorrNonSunRun.json`);
    return loanSingleBorrNonSunRun;
  }

  getLoanCoBorrSunRun() {
    const loanCoBorrSunRun = require(`${folderResults}${this.testNumber}/loanCoBorrSunRun.json`);
    return loanCoBorrSunRun;
  }

  getLoanCoBorrNonSunRun() {
    const loanCoBorrNonSunRun = require(`${folderResults}${this.testNumber}/loanCoBorrNonSunRun.json`);
    return loanCoBorrNonSunRun;
  }
}

module.exports = LoanDocsResultsFiles;
