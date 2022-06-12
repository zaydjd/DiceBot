const Discord = require("discord.js");
require("dotenv").config();
const TOKEN = process.env['TOKEN'];
const WOKCommands = require('wokcommands');
const path = require('path');
const keepAlive = require('./server.js');

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
  
    new WOKCommands(client, {
      commandsDir: path.join(__dirname, 'commands')
    })
})

keepAlive();
client.login(TOKEN);