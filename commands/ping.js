const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    
    let ping = await message.channel.send("Your Ping is being Calculated...");
    ping.edit('Pong! Your Ping is: ' + (Math.round((ping.createdTimestamp - message.createdTimestamp)/2 - bot.ping) + 'ms'));
}

module.exports.config = {
    name: "ping",
    aliases: ["myping"]
}