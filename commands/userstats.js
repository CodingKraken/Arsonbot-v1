const Discord = require('discord.js');
const colours = require('../colours.json');
const fs = require('fs');
let xp = require('../xp.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    if(!xp[message.author]) {
        xp[message.author] = {
            level: 1,
            xp: 0,
            messages: 1
        }
    }

    let xpAdd = Math.round((Math.random() * 15) + 5);
    let currentLevel = xp[message.author].level;
    let currentXp = xp[message.author].xp;

    let nextLevelXp = 1000 * (1.1 ** (currentLevel - 1));
    currentXp += xpAdd;

    let lEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Levels`, message.guild.iconURL)
    .setTitle(`**${message.author.username}'s Stats**`)
    .setColor(colours.green_light)
    .setThumbnail(message.author.displayAvatarURL)
    .addField('**Current Level**', currentLevel, true)
    .addField('**Current XP**', currentXp, true)
    .addField('**XP Required for next level**', nextLevelXp)
    .addField('**Total Messages**', messages)
    .addField('**You joined the server**', message.member.joinedAt)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
    message.channel.send(lEmbed);
    
    fs.writeFile('./xp.json', JSON.stringify(xp), (err) => {
        if(err) console.log(err);
    });
}

module.exports.config = {
    name: "stats",
    aliases: ["userstats","mystats"]
}