function getRandom() {
  return Math.floor(Math.random() * 9);
}
function assembleRand(num) {
  let assembedNum = '';
  for (let i = 0; i < num; i++) {
    let randNum = getRandom();
    if (i === 0 && randNum === 0) {
      randNum++;
    }
    assembedNum += randNum.toString();
  }
  return assembedNum;
}

function main(num = 1) {
  const randNum = assembleRand(num);
  console.log('randNum:', randNum);
  return +randNum;
}

module.exports.main = main;
