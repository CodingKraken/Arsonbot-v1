const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    message.channel.send("Arsonbot is online and working!");
}

module.exports.config = {
    name: "test",
    aliases: ["chtest"]
}