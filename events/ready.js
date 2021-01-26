const Discord = require('discord.js');

module.exports = bot => {
    console.log(bot.user.username + " is online!");
    bot.user.setActivity("Tristan's suffering while I force him to work on me", {type: "LISTENING"});   
}