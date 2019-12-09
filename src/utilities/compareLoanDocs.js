import CompareText from './compareText'
import ParsePDF from './parsePDF'

export default class CompareLoanDocs {
    constructor(fileToTest, expectedFile) {
        this.fileToTest = fileToTest;
        this.expectedFile = expectedFile
    }

    async analyzeComparison(resultComp){
        let finalArray=[]
        resultComp.forEach(element => {
            if (element.includes('Envelope ID')) {}
            else {
                finalArray.push(element)
            }
        })
        return finalArray
    }

    async compare() {
        const textTestFile = await new ParsePDF(this.fileToTest).getPdfText();
        const textExpected = await new ParsePDF(this.expectedFile).getPdfText();
        const compareText = new CompareText(textTestFile, textExpected);
        let result = await compareText.compare();
        let finalComp = await this.analyzeComparison(result)
        return finalComp
    }
}