const { AWS, path, fs } = require('../utilities/imports');

// AWS.config.update(
//   {
//     accessKeyId: ".. your key ..",
//     secretAccessKey: ".. your secret key ..",
//   }

export default class S3API {
  /**
   * Class has optional parameter
   * @param bucket Name of the S3 bucket
   * @param location S3/lp-test-automation/<location> (OPTIONAL)
   */
  constructor(bucket, location = '') {
    this.s3 = new AWS.S3();
    this.bucket = bucket;
    this.bucketName = path.join(this.bucket, location).replace(/\\/g, '/');
  }

  checkBucketExists = async () => {
    const options = {
      Bucket: this.bucket
    };
    try {
      await this.s3.headBucket(options).promise();
      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        return false;
      }
      throw error;
    }
  };

  uploadFile = async (file, filePath) => {
    let bucketPath = path.basename(file);
    if (file.includes(filePath)) {
      bucketPath = file.substring(filePath.length + 1).replace(/\\/g, '/');
    }
    const params = { Bucket: this.bucketName, Key: bucketPath, Body: fs.readFileSync(file) };
    try {
      await this.s3.putObject(params).promise();
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

  async downloadFile(file, locationToDropFile = './') {
    try {
      const params = {
        Bucket: this.bucket,
        Key: `${file}`
      };
      const data = await this.s3.getObject(params).promise();
      fs.writeFileSync(locationToDropFile + file, data.Body.toString('utf-8'));
      return true;
    } catch (e) {
      return `${file} does not exist. Error: ${e}`;
    }
  }

  async downloadFileFromS3AsString(key) {
    const { Body: buffer } = await this.s3.getObject({ Bucket: this.bucket, Key: key }).promise();
    return buffer.toString();
  }

  getBucketNotificationConfiguration() {
    return this.s3.getBucketNotificationConfiguration({
      Bucket: this.bucket
    });
  }

  async getListObjects() {
    try {
      const params = {
        Bucket: this.bucket
      };
      const data = await this.s3.listObjects(params).promise();
      return data;
    } catch (e) {
      return e;
    }
  }
}
