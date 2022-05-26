function isDice(sides) {
    const realDice = [2,4,6,8,10,12,20,100];
    if (realDice.includes(sides)) {
      return true;
    }
    return false;
  }

module.exports = isDice;