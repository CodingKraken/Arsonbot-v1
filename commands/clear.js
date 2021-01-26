const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("oof");
    if(!args[0]) return message.channel.send("Please specify how many messages you want me to delete");

    if(args[0] > 100) { 
        message.channel.send('You can only delete 100 messages at a time, this includes the delete command.')
    } else {
            message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
                message.channel.send(`Cleared ${args[0]} messages.`).then(message => message.delete(5000));
            });
    }
}

module.exports.config = {
    name: "clear",
    aliases: ["delete", "purge"]
}