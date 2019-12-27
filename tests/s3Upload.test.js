import S3API from '../src/apis/s3API';

const { fs, path } = require('../src/utilities/imports');

describe('S3', () => {
  const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');
  const file = path.join(folderResults, 'latestTestNumber.txt');
  const testNumber = fs.readFileSync(file).toString();
  const s3Dir = path.join('__testResults__', testNumber);
  const filePath = path.join(folderResults, testNumber);
  const s3API = new S3API(s3Dir);

  test('Upload file to S3', async () => {
    await s3API.uploadFile(file, filePath);
  }, 300000);

  test('Upload directory to S3', async () => {
    await s3API.uploadDir(filePath);
  }, 300000);
});
