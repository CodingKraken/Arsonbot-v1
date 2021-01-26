const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let responses = [`@${message.author.tag} no u lol`, `@${message.author.tag} joe mama`]
    let pick = Math.round(Math.random() * 1)
    
    if(pick >= 1) {
        message.channel.send(`${responses[1]}`)
    }
    if(pick < 1){
        message.channel.send(`${responses[0]}`)
    }
}
module.exports.config = {
    name: "gay",
    aliases: ["gae"]
}