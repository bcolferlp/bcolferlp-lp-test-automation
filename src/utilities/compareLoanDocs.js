import CompareData from './compareData'
import ParsePDF from './parsePDF'
import { fstat } from 'fs';
const fs = require('fs');

export default class CompareLoanDocs {
    constructor(fileToTest, expectedFile) {
        this.fileToTest = fileToTest;
        this.expectedFile = expectedFile
    }

    async analyzeComparison(addedArray, removedArray){
        let finalArray=[]
        addedArray.forEach(element => {
            if (element.includes('Envelope ID')) {}
            else {
                finalArray.push('(+) '+element)
            }
        })
        removedArray.forEach(element => {
            if (element.includes('Envelope ID')) {}
            else {
                finalArray.push('(-) '+element)
            }
        })
        return finalArray
    }

    async compare() {
        const textTestFile = await new ParsePDF(this.fileToTest).getPdfText();
        //fs.writeFileSync(`testedloan.txt`, textTestFile)
        const textExpected = await new ParsePDF(this.expectedFile).getPdfText();
        //fs.writeFileSync(`expectedloan.txt`, textExpected)
        // compare text results
        const compareText =  new CompareData(textTestFile, textExpected);
        let [addedArray, removedArray] = await compareText.compare();
        console.log("added:",addedArray)
        console.log("removed",removedArray)
        let finalComp = await this.analyzeComparison(addedArray, removedArray)
        return finalComp
    }
}