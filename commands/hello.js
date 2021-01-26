const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
   message.channel.send("Hello. What do you want?")
}

module.exports.config = {
    name: "hello",
    aliases: ["hola"]
}