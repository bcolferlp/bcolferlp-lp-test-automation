const jsdiff = require('diff');

export default class CompareText {
  constructor(source, dest) {
    this.source = source;
    this.dest = dest;
  }

  async compare() {
    const diff = jsdiff.diffTrimmedLines(this.source, this.dest);
    let resultDiff = []
    diff.forEach(function (part) {
      if (part.added) {
        resultDiff.push("(+) "+part.value)
      }
      else if (part.removed){
        resultDiff.push("(-) "+part.value)
      }
    });
    return resultDiff
  }
}
