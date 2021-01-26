const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    const voiceChannel = message.member.voiceChannel;

    if(!message.member.voiceChannel) return message.channel.send("You're not in a Voice Channel!");
    message.member.voiceChannel.leave();  
}

module.exports.config = {
    name: "stop",
    aliases: ["leave"]
}