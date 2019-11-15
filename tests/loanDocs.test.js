import each from 'jest-each'
import ParsePDF from '../src/utilities/parsePDF'


describe('Loans documents comparison', () => {

each([
    ['./src/utilities/test.pdf','./src/utilities/expected.pdf']
    ])
    .test('Number of Pages comparison pdfs', async (fileToTest, expectedFile, done) => {
        const numberofPagesTestFile = await new ParsePDF(fileToTest).getNumberOfPages()
        const numberofPagesExpected = await new ParsePDF(expectedFile).getNumberOfPages()
        expect(numberofPagesTestFile).toBe(numberofPagesExpected)
        done()
        }, 5000)
    
each([
    ['./src/utilities/test.pdf','./src/utilities/expected.pdf']
    ])
    .test('PDF text comparison', async (fileToTest, expectedFile, done) => {
        const textTestFile = await new ParsePDF(fileToTest).getPdfText()
        const textExpected = await new ParsePDF(expectedFile).getPdfText()
        expect(textTestFile).toBe(textExpected)
        done()
        }, 5000)
    
    })