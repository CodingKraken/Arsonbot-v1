const Discord = require('discord.js');
const colours = require('../colours.json');
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    let msg = await message.channel.send("Generating...")

    fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("Whoops, the server isn't finding any pictures! Try Again.")

        let cEmbed = new Discord.RichEmbed()
        .setColor(colours.red_light)
        .setAuthor(`${bot.user.username} Dogs`, message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
        message.channel.send(cEmbed);

    msg.delete();
    })
}

module.exports.config = {
    name: "dog",
    aliases: ["doggo"]
}