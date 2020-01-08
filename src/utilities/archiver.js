// require modules
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const logUpdate = require('log-update');

export default class Archiver {
  constructor(filePath) {
    this.filePath = filePath;
    this.zipPath = path.join(filePath, `${path.basename(filePath)}.zip`);
  }

  zip() {
    // create a file to stream archive data to.
    const { zipPath } = this;
    const output = fs.createWriteStream(this.zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    return new Promise((resolve, reject) => {
      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on('close', function() {
        console.log(`${archive.pointer()} total bytes`);
        resolve(zipPath);
      });

      // good practice to catch this error explicitly
      archive.on('error', function(err) {
        reject(err);
      });

      archive.on('progress', e => {
        logUpdate(`Processing: ${e.fs.processedBytes} bytes / ${e.fs.totalBytes} total bytes`);
      });

      // pipe archive data to the file
      archive.pipe(output);

      // archive entire folder to the file path
      archive.directory(this.filePath, false);

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
      archive.finalize();
    });
  }
}
