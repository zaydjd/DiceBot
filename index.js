const Discord = require("discord.js");
require("dotenv").config();
const TOKEN = process.env['TOKEN'];
const keepAlive = require('./server.js');

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)

    const guildId = '954225483913003068';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.'
    });
    commands?.create({
        name: 'roll',
        description: 'Rolls dice',
        options: [
            {
                name: 'num',
                description: 'Number of dice to roll',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'sides',
                description: 'Number of sides',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'mod',
                description: 'Roll modifier',
                required: false,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong'
        });
    } else if (commandName === 'roll') {
        const num = options.getNumber('num');
        const sides = options.getNumber('sides');
        const mod = options.getNumber('mod');

        let finalValue = []
        for (let i = 1; i <= num; i++) {
            let rolledValue = Math.floor((Math.random() * sides) + 1);
            finalValue.push(rolledValue);
        }
        
        function theReply() {
            if (num > 10) {
                interaction.reply({
                    content: `Why are you rolling so many dice :sweat: \n` + defaultReply
                });
            } else {
                interaction.reply({
                    content: defaultReply
                });
            }
        }
        function modExists() {
            if (typeof mod !== 'number') {
                return 0;
            } else {
                return mod;
            }
        }
        function isDice() {
          const realDice = [2,4,6,8,10,12,20,100];
          if (realDice.includes(sides)) {
            return true;
          }
          return false;
        }
        
        let defaultReply = `You rolled ${num}d${sides} and got: ${finalValue} \n` + 
                            `Total (modifier ${modExists()}): ${finalValue.reduce((accumulator, item) => accumulator + item) + (mod*num)}`;

        if (isDice()) {
          theReply();
        } else {
          interaction.reply({
                    content: `${sides} is not a valid input`
                });
        }
    }
})

keepAlive();
client.login(TOKEN);