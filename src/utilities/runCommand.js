const util = require('util');
const exec = util.promisify(require('child_process').exec);

class RunCommand{
  constructor(command){
    this.command = command
  }

  async execute(){
    const {stdout, stderr} = await exec(this.command);
    return stdout, stderr
  }
}

module.exports = RunCommand