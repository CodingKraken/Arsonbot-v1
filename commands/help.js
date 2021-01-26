const Discord = require('discord.js');
const colours = require('../colours.json')
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    message.channel.send('Here is our list of commands!')
    let hEmbed = new Discord.RichEmbed()
    .setColor(colours.blue_dark)
    .setAuthor(`${bot.user.username} Commands`, message.guild.iconURL)
    .addField('**All of ArsonBot\'s commands!**', '**NOTE: Some of these are experimental and might not work**', true)
    .addField("alpaca", "Displays a random image of an alpaca")
    .addField("ban", "Allows anyone with the administrator permission to ban a user with more than 3 kicks")
    .addField("botinfo", "Displays info about ArsonBot")
    .addField("cat", "Displays a random image of a cat")
    .addField("clear", "Deletes x amount of messages from a channel")
    .addField("dog", "Displays a random image of a dog")
    .addField("kick", "Allows anyone with the adminstrator permission to kick a user with more than 5 warnings.")
    .addField("level", "Displays your current ArsonBot level")
    .addField("math", "Does math for you. Limited currently to + - * / root and factorial")
    .addField("meme", "Displays a random meme from r/dankmemes")
    .addField("ping", "Shows an estimation of your discord ping")
    .addField("play", "**(EXPERIMENTAL)** Plays audio from a youtube video")
    .addField("prefix", "Changes the ArsonBot server prefix to one of your chosing")
    .addField("removewarning", "Allows anyone with the Manage Messages permission to removing some or all of a user's warnings")
    .addField("serverinfo", "Displays info about this server")
    .addField("stop", "**(EXPERIMENTAL)** Stops the audio stream for a video")
    .addField("timer", "Sets a countdown timer in seconds")
    .addField("random", "Returns a random number between 2 other numbers. Can also have 'up' or 'down' to round the value up or down")
    .addField("warn", "Allows anyone with the Manage Messages permission to warn a user for breaking a rule")
    .addField("warnings", "Allows anyone to see the number of warnings and kicks of another user.")
    .addField("ZA WARUDO", "(**MOD COMMAND, DON'T USE WITH PREFIX)** Currently only works for Weirdos with an Attitude, disables the Send Message permission in a channel for 60 seconds")
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

    message.channel.send(hEmbed);
    }

module.exports.config = {
    name: "help",
    aliases: ["help"]
}