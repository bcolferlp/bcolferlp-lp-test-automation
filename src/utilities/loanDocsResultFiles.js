/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { fs, path } = require('./imports');

const folderResults = path.join(__dirname, '../../data/loanDocs/testResults/');

class LoanDocsResultsFiles {
  constructor() {
    this.testNumber = fs.readFileSync(`${folderResults}latestTestNumber.txt`).toString();
  }

  getLoanSingleBorrSunRun() {
    let loanSingleBorrSunRun = [];
    const path = `${folderResults}${this.testNumber}/loanSingleBorrSunRun.json`;
    if (fs.existsSync(path)) loanSingleBorrSunRun = require(path);
    return loanSingleBorrSunRun;
  }

  getLoanSingleBorrNonSunRun() {
    let loanSingleBorrNonSunRun = [];
    const path = `${folderResults}${this.testNumber}/loanSingleBorrNonSunRun.json`;
    if (fs.existsSync(path)) loanSingleBorrNonSunRun = require(path);
    return loanSingleBorrNonSunRun;
  }

  getLoanCoBorrSunRun() {
    let loanCoBorrSunRun = [];
    const path = `${folderResults}${this.testNumber}/loanCoBorrSunRun.json`;
    if (fs.existsSync(path)) loanCoBorrSunRun = require(path);
    return loanCoBorrSunRun;
  }

  getLoanCoBorrNonSunRun() {
    let loanCoBorrNonSunRun = [];
    const path = `${folderResults}${this.testNumber}/loanCoBorrNonSunRun.json`;
    if (fs.existsSync(path)) loanCoBorrNonSunRun = require(path);
    return loanCoBorrNonSunRun;
  }
}

module.exports = LoanDocsResultsFiles;