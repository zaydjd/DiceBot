const Discord = require("discord.js");
require("dotenv").config();
const TOKEN = process.env['TOKEN'];
const fs = require('node:fs');
const path = require('node:path');
const keepAlive = require('./server.js');
const isDice = require('./isDice.js');

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
    const varNumType = Discord.Constants.ApplicationCommandOptionTypes.NUMBER
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
                type: varNumType
            },
            {
                name: 'sides',
                description: 'Number of sides',
                required: true,
                type: varNumType
            },
            {
                name: 'mod',
                description: 'Roll modifier',
                required: false,
                type: varNumType
            }
        ]
    });
    commands?.create({
      name: 'health',
      description: 'Rolls for health',
      options: [
        {
          name: 'hitdie',
          description: 'Hit dice of class',
          required: true,
          type: varNumType
        },
        {
          name: 'level',
          description: 'Level of character',
          required: true,
          type: varNumType
        },
        {
          name: 'con',
          description: 'Constitution modifier',
          required: true,
          type: varNumType
        }
      ]
    })
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
        
        let defaultReply = `You rolled ${num}d${sides} and got: ${finalValue} \n` + 
                            `Total (modifier ${modExists()}): ${finalValue.reduce((accumulator, item) => accumulator + item) + (mod*num)}`;

        if (isDice(sides)) {
          theReply();
        } else {
          interaction.reply({
                    content: `${sides} is not a valid input`
                });
        }
    } else if (commandName === 'health') {
        const hitdie = options.getNumber('hitdie');
        const level = options.getNumber('level');
        const con = options.getNumber('con');
  
        let hp = hitdie + con;
        let finalVal = 0;
        for (let i = 1; i < level; i++) {
          let rolledValue = Math.floor(Math.random() * hitdie) + 1;
          finalVal = rolledValue + con + finalVal;
        }
        
        if (isDice(hitdie)) {
          console.log(hp);
          console.log(finalVal + hp); // RETURNS NaN FOR SOME REASON
          interaction.reply({
            content: `You have ${finalVal + hp} HP`
          })
        } else {
          interaction.reply({
            content: `${hitdie} is not a valid input`
          })
       }
    }
})

keepAlive();
client.login(TOKEN);