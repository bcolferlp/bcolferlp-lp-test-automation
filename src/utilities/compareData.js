const jsdiff = require('diff');

export default class CompareData {
  constructor(source, dest) {
    this.source = source;
    this.dest = dest;
    this.diff = jsdiff.diffTrimmedLines(this.source, this.dest);
  }

  async compare() {
    let addedValue = []
    let removedValue = []
    this.diff.forEach(function (part) {
      if (part.added) {
        addedValue.push(part.value)
      }
      else if (part.removed){
        removedValue.push(part.value)
      }
    });
    return [addedValue, removedValue]
  }
}
