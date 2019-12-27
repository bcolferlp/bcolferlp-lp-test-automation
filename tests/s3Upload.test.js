import S3API from '../src/apis/s3API';

const { fs, path } = require('../src/utilities/imports');

describe('S3', () => {
  const bucket = 'lp-test-automation';
  const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');
  const file = path.join(folderResults, 'latestTestNumber.txt');
  const testNumber = fs.readFileSync(file).toString();
  const location = path.join('__testResults__', testNumber);
  const filePath = path.join(folderResults, testNumber);
  const s3API = new S3API(bucket, location);
  let bucketExist;

  beforeAll(async () => {
    bucketExist = await s3API.checkBucketExists();
  });

  test('Upload file to S3', async () => {
    expect(bucketExist).toBeTruthy();
    await s3API.uploadFile(file, filePath);
  }, 300000);

  test('Upload directory to S3', async () => {
    expect(bucketExist).toBeTruthy();
    await s3API.uploadDir(filePath);
  }, 300000);
});
