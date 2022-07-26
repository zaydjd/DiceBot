const isDice = require('../isDice');

module.exports = {
  name: 'stats',

  category: 'Rolling',
  description: 'Rolls for stats using 4d6, dropping the lowest roll of the 4.',
  slash: true,

  callback: ({ interaction, args }) => {
    let stats = [];
    const sides = 6;

    function roll() {
      let rolls = [];
      for (let j = 0; j <= 3; j++) {
        let rolledVal = Math.floor((Math.random() * sides) + 1);
        rolls.push(rolledVal);
      }
      adds(rolls);
    }
    function adds(arr) {
      arr.sort(function(a, b) { return b - a });
      arr.pop();
      stats.push(arr.reduce((accumulator, item) => accumulator + item));
    }

    for (let i = 0; i <= 5; i++) {
      roll();
    }
    let defaultReply = `Rolled for stats: **${stats}**`;

    interaction.reply({
      content: defaultReply
    })
  }
}