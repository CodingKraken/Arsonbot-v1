const Discord = require('discord.js');
const colours = require('../colours.json');
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;


    let msg = await message.channel.send("Generating...")

    fetch("https://apis.duncte123.me/alpaca")
    .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("Whoops, the server isn't finding any pictures! Try Again.")

        let aEmbed = new Discord.RichEmbed()
        .setColor(colours.brown_dark)
        .setAuthor(`${bot.user.username} Alpacas`, message.guild.iconURL)
        .setImage(body.data.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
        message.channel.send(aEmbed);

    msg.delete();
   })

}

module.exports.config = {
    name: "alpaca",
    aliases: ["alpaca"]
}