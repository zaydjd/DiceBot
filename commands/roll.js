const isDice = require('../isDice');

module.exports = {
  name: 'roll',
  
  category: 'Rolling',
  description: 'Rolls dice. Does not support multiple rolls with different modifiers.',
  slash: true,
  options: [
    {
      name: 'num',
      description: 'Number of dice rolled',
      required: true,
      type: 'INTEGER'
    },
    {
      name: 'sides',
      description: 'Number of sides of die',
      required: true,
      type: 'INTEGER'
    },
    {
      name: 'mod',
      description: 'Modifier of roll',
      required: false,
      type: 'INTEGER'
    }
  ],

  callback: ({ interaction, args }) => {
    const num = parseInt(args[0]);
    const sides = parseInt(args[1]);
    let mod = 0;
    let finalValue = [];
    
    if (args[2]) mod = parseInt(args[2]);
    
    for (let i = 1; i <= num; i++) {
        let rolledValue = Math.floor((Math.random() * sides) + 1);
        finalValue.push(rolledValue);
    }
    let defaultReply = `Rolled **${num}d${sides}** for: **${finalValue}** \n` + 
      `Total (modifier ${mod}): ` + 
      `${finalValue.reduce((accumulator, item) => accumulator + item) + (mod*num)}`;
    
    if (isDice(sides)) {
      interaction.reply({
        content: defaultReply
      }) 
    } else {
      return `**${sides}** is not valid.`
    }
  }
}