import S3API from '../src/apis/s3API';
import Archiver from '../src/utilities/archiver';

const { fs, path } = require('../src/utilities/imports');

jest.setTimeout(60000 * 30);
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
    expect(bucketExist).toBeTruthy();
  });

  test.skip('Upload zipped file to S3', async () => {
    const archive = new Archiver(filePath);
    const zipPath = await archive.zip();
    expect(zipPath).toBeTruthy();
    console.log(`Uploading zipped file: ${zipPath}`);
    await s3API.uploadFile(zipPath, filePath);
  });

  test.skip('Upload file to S3', async () => {
    expect(bucketExist).toBeTruthy();
    await s3API.uploadFile(file, filePath);
  });

  test.skip('Upload directory to S3', async () => {
    expect(bucketExist).toBeTruthy();
    await s3API.uploadDir(filePath);
  });

  test.skip('Download File from S3', async () => {
    const didDownload = await s3API.downloadFile('index.html');
    expect(didDownload).toBe(true);
    //let result = await s3API.getBucketNotificationConfiguration();
    //console.log(result);
  }, 300000);

  test('List objects from S3 bucket', async () => {
    const listObjects = await s3API.getListObjects();
    console.log(listObjects);
  }, 300000);
});
