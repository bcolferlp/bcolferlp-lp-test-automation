import S3API from '../src/apis/s3API';
import RunCommand from '../src/utilities/runCommand';
import { MarketplaceCommerceAnalytics } from 'aws-sdk';

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
  });

  test.only('Upload zipped file to S3', async () => {
    expect(bucketExist).toBeTruthy();
    const command = `node src/utilities/archiver.js`;
    const runComm = new RunCommand(command);
    const result = await runComm.execute();
    const [memory, zipPath] = result.stdout.split('\n');
    expect(zipPath).toBeTruthy();
    console.log(`Uploading zipped file: ${zipPath}, ${memory}`);
    await s3API.uploadFile(zipPath, filePath);
  });

  test('Upload file to S3', async () => {
    expect(bucketExist).toBeTruthy();
    await s3API.uploadFile(file, filePath);
  });

  test('Upload directory to S3', async () => {
    expect(bucketExist).toBeTruthy();
    await s3API.uploadDir(filePath);
  });
});
