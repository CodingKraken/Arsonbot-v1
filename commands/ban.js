const Discord = require('discord.js');
const colours = require('../colours.json');
const fs = require('fs');
let warnings = require('../warnings.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('oof');
    
    let user = args[0];
    let reason = args[1];

    if(!args[1]) return message.channel.send('You need a reason to ban a user!');

    if(!user.startsWith('<@') && !user.endsWith('>')) return message.channel.send(` \`${user}\` is not a valid user!`);

    if(!warnings[user]){
        warnings[user] = {
            total_warnings: 0,
            total_kicks: 0
        };
    }

    if(!user.total_kicks >= 3) return message.channel.send(`${user} doesn't have more than 3 kicks!`)

    warnings[user].total_kicks++

    if(args[0]){
        const matches = user.match(/^<@!?(\d+)>$/);
        let usertag = matches[1]
        let userT = bot.users.get(usertag);
    } else {
        userT = message.author
    }

    let bEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Moderation`, message.guild.iconURL)
    .setColor(colours.red_light)
    .setTitle("**User Banned**")
    .setThumbnail(userT.displayAvatarURL)   
    .addField("**User Banned", `**${user}**`)
    .addField("**Reason For Ban**", `**${reason}**`)
    .addField("**Kicks before ban**", `**${warnings[user].total_kicks}**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

    message.channel.send(bEmbed);
    bot.channel.get("459042564067033108").send(bEmbed);

    warnings[user].total_warnings = 0;
    message.guild.member(user).ban(reason);

    fs.writeFile('../warnings.json', warnings, (err) => {
        if(err) console.log(err);
    });
}

module.exports.config = {
    name: "ban",
    aliases: ["banuser"]
}