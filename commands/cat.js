const Discord = require('discord.js');
const colours = require('../colours.json');
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    let msg = await message.channel.send("Generating...")

    fetch("http://aws.random.cat/meow")
    .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("Whoops, the server isn't finding any pictures! Try Again.")

        let cEmbed = new Discord.RichEmbed()
        .setColor(colours.yellow)
        .setAuthor(`${bot.user.username} Cats`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
        message.channel.send(cEmbed);

    msg.delete();
   })
}

module.exports.config = {
    name: "cat",
    aliases: ["kitty", "pussy"]
}