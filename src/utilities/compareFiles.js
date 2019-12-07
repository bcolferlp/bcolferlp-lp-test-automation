const jsdiff = require('diff');

export default class CompareFiles {
  constructor(source, dest) {
    this.source = source;
    this.dest = dest;
  }

  compare() {
    const diff = jsdiff.diffTrimmedLines(this.source, this.dest);
    diff.forEach(function(part) {
      const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
      process.stderr.write(part.value[color]);
    });
  }
}
