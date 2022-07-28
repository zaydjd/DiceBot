module.exports = {
  name: 'roll',

  category: 'Rolling',
  description: 'Rolls dice. Does not support multiple rolls with different modifiers.',
  slash: true,
  options: [
    {
      name: 'num',
      description: 'Number of dice rolled. Defaults to 1 if rolling less than/equal to 0 or greater than 100.',
      required: true,
      type: 'INTEGER'
    },
    {
      name: 'sides',
      description: 'Number of sides of die. Must be non-zero and less than 1000.',
      required: true,
      type: 'INTEGER'
    },
    {
      name: 'mod',
      description: 'Modifier of roll.',
      required: false,
      type: 'INTEGER'
    }
  ],

  callback: ({ interaction, args }) => {
    let num = 1;
    if (args[0] < 101 && args[0] > 0) num = parseInt(args[0]);

    const sides = parseInt(args[1]);
    let mod = 0;
    let finalVal = [];

    if (args[2]) mod = parseInt(args[2]);

    for (let i = 1; i <= num; i++) {
      let rolledVal = Math.floor((Math.random() * sides) + 1);
      finalVal.push(rolledVal);
    }
    let defaultReply = `Rolling: **${num}d${sides}** \n` +
      `Results: **${finalVal}** \n` +
      `Total (modifier ${mod}): ` +
      `**${finalVal.reduce((accumulator, item) => accumulator + item) + (mod * num)}**`;

    if (sides != 0 && sides < 1000) {
      interaction.reply({
        content: defaultReply
      })
    } else {
      return `**${sides}** is not valid.`
    }
  }
}