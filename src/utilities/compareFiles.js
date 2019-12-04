import ParsePDF from '../src/utilities/parsePDF'
var jsdiff = require('diff')

class CompareFiles{
    constructor(source, dest){
        this.source = source
        this.dest = dest
    }

    compare(){
        let diff = jsdiff.diffTrimmedLines(this.source, this.dest)
        diff.forEach(function(part){
            var color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
            process.stderr.write(part.value[color]);
        })
    }

}