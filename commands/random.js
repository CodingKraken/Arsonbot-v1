const Discord = require('discord.js');
const fs = require('fs');
const botconfig = require('../botconfig.json');
const colours = require('../colours.json');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    let num1;
    let num2;
    let randomNum;
    if(!args[1]) {
        num1 = 1;
        num2 = args[0];
    } else if(args[1] && args[0]) {
        num1 = args[0];
        num2 = args[1];
    } else {
        return message.channel.send("Error: Command requires at least one input")
    }

    if(!args[2]) {
        randomNum = Math.round((Math.random() * num2) + num1);
    } else if(args[2].toLowerCase() === 'up') {
        randomNum = Math.ceil((Math.random() * num2) + num1);
    } else if(args[2].toLowerCase() === 'down') {
        randomNum = Math.floor((Math.random() * num2) + num1);
    } else {
        return message.channel.send("Rounding must be either 'up' or 'down'")
    }
    message.channel.send(randomNum);
    


}

module.exports.config = {
    name: "random",
    aliases: ["randnum", "roll"]
}