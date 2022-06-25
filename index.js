const Discord = require('discord.js') // Discord.JS library
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] }) // Client to connect to
const { TOKEN } = require('./token') //TOKEN for Discord BOT
const prefix = '!' // Prefix for commands
const fs = require('fs')


client.on("ready", () => { // On client connection to Discord server
    console.log(`Connected as ${client.user.tag}!`); // Log connnected as + client name
})

client.commands = new Discord.Collection() // Set up a collection for client commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')) // Browse files for files ending in .js in commands folder

for (const file of commandFiles) { // Iterate through all files
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command) // Set the command name and associated command
}


client.on("message", msg => { // On message receive in channel
    if (!msg.content.startsWith(prefix) || msg.author.bot) return; // Check if message starts with prefix or if message is from user not bot

    const args = msg.content.slice(prefix.length).split(/ +/); // Slice arguments after command
    const command = args.shift().toLowerCase(); // Send to lowercase

    if (command === 'ping') { // Check content of message, if == ping, reply with pong
        client.commands.get('ping').execute(msg, args) // Fetch the client command matching with the msg
    }
    else if (command === 'play') {
        client.commands.get('play').execute(msg, args) 
    } 
    else if (command === 'leave') {
        client.commands.get('leave').execute(msg, args) 
    }
})

client.login(TOKEN) // Setting your TOKEN for client login