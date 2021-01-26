const Discord = require('discord.js');
const colours = require('../colours.json');
const fs = require('fs');
let warnings = require('../warnings.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('oof');
    
    let user = args[0];
    let reason = args[1];

    if(!args[1]) return message.channel.send('You need a reason to kick a user!');

    if(!user.startsWith('<@') && !user.endsWith('>')) return message.channel.send(` \`${user}\` is not a valid user!`);

    if(!warnings[user]){
        warnings[user] = {
            total_warnings: 0,
            total_kicks: 0
        };
    }

    if(!user.total_warnings >= 5) return message.channel.send(`${user} doesn't have more than 5 warnings!`)

    warnings[user].total_kicks++

    if(args[0]){
        const matches = user.match(/^<@!?(\d+)>$/);
        let usertag = matches[1]
        let userT = bot.users.get(usertag);
    } else {
        userT = message.author
    }    
    let kEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Moderation`, message.guild.iconURL)
    .setColor(colours.red_light)
    .setTitle("**User Kicked**")
    .setThumbnail(usersT.displayAvatarURL)
    .addField("**User Kicked", `**${user}**`)
    .addField("**Reason For Kick**", `**${reason}**`)
    .addField("**Warnings before kicked**", `**${warnings[user].total_warnings}**`)
    .addField("**Number of Kicks", `**${warnings[user].total_warnings}**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

    message.channel.send(kEmbed);
    bot.channel.get("459042564067033108").send(kEmbed);

    warnings[user].total_warnings = 0;
    message.guild.member(user).kick(reason);

    fs.writeFile('../warnings.json', warnings, (err) => {
        if(err) console.log(err);
    });
}

module.exports.config = {
    name: "kick",
    aliases: ["kickuser"]
}