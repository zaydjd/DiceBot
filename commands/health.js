module.exports = {
  name: 'health',

  category: 'Rolling',
  description: 'Rolls for initial health. Does not support multiclassing.',
  slash: true,
  options: [
    {
      name: 'hitdie',
      description: 'Hitdie of class',
      required: true,
      type: 'INTEGER'
    },
    {
      name: 'level',
      description: 'Level of character',
      required: true,
      type: 'INTEGER'
    },
    {
      name: 'con',
      description: 'Modifier of roll',
      required: false,
      type: 'INTEGER'
    }
  ],

  callback: ({ interaction, args }) => {
    const hitdie = parseInt(args[0]);
    const level = parseInt(args[1]);
    const con = parseInt(args[2]);

    let hp = hitdie + con;
    let finalVal = 0;

    for (let i = 1; i < level; i++) {
      let rolledVal = Math.floor(Math.random() * hitdie) + 1;
      finalVal = rolledVal + con + finalVal;
    }

    interaction.reply({
      content: `Total HP: **${finalVal + hp}**`
    })
  }
}