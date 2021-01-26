const Discord = require('discord.js');
const colours = require('../colours.json');
const fs = require('fs');
let warnings = require('../warnings.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('oof');
    
    let user = args[0];
    if(!user.startsWith('<@') && !user.endsWith('>')) return message.channel.send(` \`${user}\` is not a valid user!`);

    if(!warnings[user]){
        warnings[user] = {
            total_warnings: 0
        };
    }

    let warningsToRemove = 0;
    if(!args[1]) {
        warningsToRemove = 1;
    } else {
        warningsToRemove = parseInt(args[1]);
    }
    if(warningsToRemove >= warnings[user].total_warnings) {warningsToRemove = warnings[user].total_warnings}
    warnings[user].total_warnings -= warningsToRemove;

    let warningsBeforeKicked = 5 - warnings[user].total_warnings;
    let KicksBeforeBanned = 3 - warnings[user].total_kicks;

    if(warningsBeforeKicked < 1) {
        warningsBeforeKicked = "Kickable"
    }

    if(KicksBeforeBanned < 1) {
        KicksBeforeKicked = "Banable"
    }

    fs.writeFile('../warnings.json', JSON.stringify(warnings), (err) => {
        if(err) console.log(err);
    });
    
    if(args[0]){
        const matches = user.match(/^<@!?(\d+)>$/);
        let usertag = matches[1]
        let userT = bot.users.get(usertag);
    } else {
        userT = message.author
    }
    
    let wEmbed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Moderation`, message.guild.iconURL)
    .setColor(colours.red_light)
    .setTitle("**Current Warnings**")
    .setThumbnail(userT.displayAvatarURL)   
    .addField("**Total Warnings**", `**${warnings[user].total_warnings}**`)
    .addField("**Warnings before kickable**", `**${warningsBeforeKicked}**`)
    .addField("**Kicks before banable**",`**${KicksBeforeBanned}**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

    message.channel.send(wEmbed);
}

module.exports.config = {
    name: "removewarning",
    aliases: ["removewarn","removewarnings"]
}