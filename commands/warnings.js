const Discord = require('discord.js');
const colours = require('../colours.json');
let warnings = require('../warnings.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    
    let user = args[0];
    if(!args[0]) user = message.author
    if(!user.startsWith('<@') && !user.endsWith('>')) return message.channel.send(` \`${user}\` is not a valid user!`);

    if(!warnings[user]){
        warnings[user] = {
            total_warnings: 0,
            total_kicks: 0
        };
    }

    let warningsBeforeKicked = 5 - warnings[user].total_warnings;
    if(warningsBeforeKicked < 1) {
        warningsBeforeKicked = "Kickable"
    }

    let KicksBeforeBanned = 3 - warnings[user].total_kicks;
    if(KicksBeforeBanned < 1) {
        KicksBeforeKicked = "Banable"
    }

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
    .addField("**Kicks before Banable**", `**${KicksBeforeBanned}**`)
    .setTimestamp()
    .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

    message.channel.send(wEmbed);

}

module.exports.config = {
    name: "warnings",
    aliases: ["total_warnings"]
}