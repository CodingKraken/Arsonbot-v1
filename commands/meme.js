const Discord = require('discord.js');
const colours = require('../colours.json');
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;

    let msg = await message.channel.send("Generating...")

    fetch("https://apis.duncte123.me/meme")
    .then(res => res.json()).then(body => {
        if(!body) return message.channel.send("Whoops, the meme-machine stopped working! Try Again.")

        let mEmbed = new Discord.RichEmbed()
        .setColor(colours.blue_dark)
        .setAuthor(`${bot.user.username} Memes`, message.guild.iconURL)
        .setTitle(body.data.title)
        .setImage(body.data.image)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
        
        message.channel.send(mEmbed);

    msg.delete();
    })
}

module.exports.config = {
    name: "meme",
    aliases: ["memes"]
}