import ParsePDF from '../src/utilities/parsePDF';
import CompareFiles from './compareFiles';

const file1 = 'C:\\Users\\jreyes\\JS-Projects\\lp-test-automation\\data\\tests\\singleBorrSunRun.pdf';
const file2 = 'C:\\Users\\jreyes\\JS-Projects\\lp-test-automation\\data\\templates\\singleBorrSunRunTemplate.pdf';
// parsePDFs
const file1txt = new ParsePDF(file1).getPdfText();
const file2txt = new ParsePDF(file2).getPdfText();
//
const c = new CompareFiles(file1txt, file2txt);
c.compare();
