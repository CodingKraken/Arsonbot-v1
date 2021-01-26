const Discord = require('discord.js');
const colours = require('../colours.json')
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(message.author.id != '401608030786945025') return message.channel.send("You're not me, and I don't approve of that shit.");

    if(!args[0]) return message.channel.send("Please provide a command to reload!");

    let command = args[0].toLowerCase();

    try {
        delete require.cache[require.resolve(`./${command}.js`)]
        bot.commands.delete(command)
        const pull = require(`./${command}.js`)
        bot.commands.set(command, pull)
    } catch(error) {
        return message.channel.send(`Could not reload: \`${command.toUpperCase()}\``)
    }

    let uEmbed = new Discord.RichEmbed() 
    .setColor(colours.gold)
    .setAuthor(`${bot.user.username} Commands`, message.guild.iconURL)
    .setTitle('**Command Updated!**')
    .setDescription(`**Updated the ${args[0].toUpperCase()} Command!**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
    message.channel.send(uEmbed);
}

module.exports.config = {
    name: "update",
    aliases: ["reload"]
}