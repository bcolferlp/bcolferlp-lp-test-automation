const fs = require('fs')
const { path } = require('./imports');
const folderResults = path.join(__dirname, '../../data/loanDocs/testResults/');


class LoanDocsResultsFiles{
    constructor(){
        this.testNumber = fs.readFileSync(`${folderResults}latestTestNumber.txt`).toString()
    }

    getLoanSingleBorrSunRun(){
        let loanSingleBorrSunRun = []
        try{
            const loanSingleBorrSunRunString = fs.readFileSync(`${folderResults}${this.testNumber}/loanSingleBorrSunRun.txt`).toString();
            loanSingleBorrSunRun = JSON.parse("[" + loanSingleBorrSunRunString + "]");
        }catch(e){
            console.log(e)
        }
        return loanSingleBorrSunRun
    }

    getLoanSingleBorrNonSunRun(){
        let loanSingleBorrNonSunRun = []
        try{
            const loanSingleBorrNonSunRunString = fs.readFileSync(`${folderResults}${this.testNumber}/loanSingleBorrNonSunRun.txt`).toString();
            loanSingleBorrNonSunRun = JSON.parse("[" + loanSingleBorrNonSunRunString + "]");
        }catch(e){
            console.log(e)
        }
        return loanSingleBorrNonSunRun
    }

    getLoanCoBorrSunRun(){
        let loanCoBorrSunRun = []
        try{
            const loanCoBorrSunRunString = fs.readFileSync(`${folderResults}${this.testNumber}/loanCoBorrSunRun.txt`).toString();
            loanCoBorrSunRun = JSON.parse("[" + loanCoBorrSunRunString + "]");
        }catch(e){
            console.log(e)
        }
        return loanCoBorrSunRun
    }

    getLoanCoBorrNonSunRun(){
        let loanCoBorrNonSunRun = []
        try{
            const loanCoBorrNonSunRunString = fs.readFileSync(`${folderResults}${this.testNumber}/loanCoBorrNonSunRun.txt`).toString();
            loanCoBorrNonSunRun = JSON.parse("[" + loanCoBorrNonSunRunString + "]");
        }catch(e){
            console.log(e)
        }
        return loanCoBorrNonSunRun
    }

}

module.exports = LoanDocsResultsFiles