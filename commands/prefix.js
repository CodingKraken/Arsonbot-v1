const Discord = require('discord.js');
const fs = require('fs');
const botconfig = require('../botconfig.json');
const colours = require('../colours.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply ("oof");
    if(!args[0]) return message.reply(`Usage: ${botconfig.prefix}setprefix <new prefix here>`);

    let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };
    

    let pEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Prefixes`, message.guild.iconURL)
    .setColor(colours.purple_dark)
    .setTitle("**Prefix Set!**")
    .setThumbnail(message.guild.iconURL)
    .addField("Original Prefix ",`**${botconfig.prefix}**`, true)
    .addField("New Prefix", `**${args[0]}**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL);

    message.channel.send(pEmbed);
    
    fs.writeFile('./prefixes.json', JSON.stringify(prefixes), (err) => {
        if(err) console.log(err);
    });
}

module.exports.config = {
    name: "prefix",
    aliases: ["setprefix"]
}