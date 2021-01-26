const Discord = require('discord.js');
const colours = require('../colours.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    let siEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Server Info`, message.guild.iconURL)
    .setTitle(`Server Information`)
    .setColor(colours.gold)
    .setThumbnail(message.guild.iconURL)
    .addField("**Server Name:**", `**${message.guild.name}**`)
    .addField("**Server Owner:**", `${message.guild.owner}`)
    .addField("**Member Count:**", `${message.guild.memberCount}`)
    .addField("**Created On:**", `${message.guild.createdAt}`)
    .addField("**You Joined:**", `${message.member.joinedAt}`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL);

    message.channel.send(siEmbed);
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si"]
}