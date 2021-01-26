const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const colours = require('../colours.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    
    let binfo = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Info`, message.guild.iconURL)
    .setTitle(`Information about **${bot.user.username}**`)
    .setThumbnail(`${bot.user.avatarURL}`)
    .setColor(colours.cyan)
    .addField("**Version**", `**${bot.user.username} ${botconfig.version}**`)
    .addField("**Created By:**", `**${botconfig.author}**`)
    .addField("**License**", `**${botconfig.license}**`)
    .addField("**Built Using**", `**${botconfig.dependencies}** and created with **Visual Studio Code**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL);

    message.channel.send(binfo);

}

module.exports.config = {
    name: "info",
    aliases: ["botinfo"]
}