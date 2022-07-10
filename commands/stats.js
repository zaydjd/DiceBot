const isDice = require('../isDice');

module.exports = {
  name: 'stats',
  
  category: 'Rolling',
  description: 'Rolls for stats using 4d6, dropping the lowest.',
  slash: true,

  callback: ({ interaction, args }) => {
    let stats = [];
    const sides = 6;
    
    if (args[2]) mod = parseInt(args[2]);
    
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 3; j++) {
            let temp = [];
            let rolledVal = Math.floor((Math.random() * sides) + 1);
            temp.push(rolledVal);
            if (i == 3) {
                let min = Math.min.apply(Math, temp);
                stats.push(temp.filter(item => item != min));
            }
        }
    }
    let defaultReply = `Rolled for stats: **${stats}**`;
    
    interaction.reply({
        content: defaultReply
    }) 
  }
}