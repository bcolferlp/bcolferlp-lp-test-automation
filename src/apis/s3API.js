const { AWS, path, fs } = require('../utilities/imports');

const s3 = new AWS.S3();

const bucket = 'lp-test-automation';

export default class S3API {
  /**
   * Class has optional parameter
   * @param location S3/lp-test-automation/<location>
   */
  constructor(location = '') {
    this.bucketName = path.join(bucket, location).replace(/\\/g, '/');
  }

  uploadFile = async (file, filePath) => {
    let bucketPath = path.basename(file);
    if (file.includes(filePath)) {
      bucketPath = file.substring(filePath.length + 1).replace(/\\/g, '/');
    }
    const params = { Bucket: this.bucketName, Key: bucketPath, Body: fs.readFileSync(file) };
    try {
      await s3.putObject(params).promise();
      console.log(`Successfully uploaded ${bucketPath} to ${this.bucketName}`);
    } catch (e) {
      console.log(e);
    }
  };

  uploadDir(filePath) {
    const walkSync = currentDirPath => {
      const promises = fs.readdirSync(currentDirPath).map(async name => {
        const newFilePath = path.join(currentDirPath, name);
        const stat = fs.statSync(newFilePath);
        if (stat.isFile()) {
          await this.uploadFile(newFilePath, filePath);
        } else if (stat.isDirectory()) {
          await walkSync(newFilePath);
        }
      });
      return Promise.all(promises);
    };

    return walkSync(filePath);
  }
}
