const Discord = require('discord.js');
const colours = require('../colours.json');
const fs = require('fs');
let warnings = require('../warnings.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('oof');
    
    let user = args[0];
    let warningsToApply = parseInt(args[1]);

    if(!args[1]) warningsToApply = 1;
    if(!user.startsWith('<@') && !user.endsWith('>')) return message.channel.send(` \`${user}\` is not a valid user!`);

    if(!warnings[user]){
        warnings[user] = {
            total_warnings: 0,
            total_kicks: 0
        };
    }

    warnings[user].total_warnings += warningsToApply;

    let warningsBeforeKicked = 5 - warnings[user].total_warnings;
    let KicksBeforeBanned = 3 - warnings[user].total_kicks;

    if(warningsBeforeKicked < 1) {
        warningsBeforeKicked = "Kickable"
    }

    if(KicksBeforeBanned < 1) {
        KicksBeforeKicked = "Banable"
    }

    let userT = bot.fetchUser(user).then(user => user.displayAvatarURL);
    console.log(userT)

    console.log(user)
    let wEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Moderation`, message.guild.iconURL)
    .setColor(colours.red_light)
    .setTitle("**User Warned**")
    .setThumbnail(userT)
    .addField("**Total Warnings**", `**${warnings[user].total_warnings}**`)
    .addField("**Warnings before kickable**", `**${warningsBeforeKicked}**`)
    .addField("**Kicks before banable**", `**${KicksBeforeBanned}**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

    message.channel.send(wEmbed);

    fs.writeFile('../warnings.json', JSON.stringify(warnings), (err) => {
        if(err) console.log(err);
    });
}

module.exports.config = {
    name: "warn",
    aliases: ["warning"]
}