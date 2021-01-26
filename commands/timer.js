//Imports Discord.js, the botconfig file and establishes the Timer Set
const Discord = require('discord.js');
const fs = require('fs');
const timers = new Set();


module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;

    if(!args[0]) return message.channel.send(`Usage: <prefix>timer <insert amount of time here in seconds>`);
    
    //Prevents users from setting more than one timer at a time
    if(timers.has(message.author.id)){
        message.reply("Please wait out your existing timers before using this command again!")
    }
    
    //Creates the Timer 
    if(args[0]){
        message.channel.send(`Timer set for ${args[0]} seconds!`)
        timers.add(message.author.id);
        setTimeout(() => {
            timers.delete(message.author.id);
            message.reply("Time's up!");
        }, args[0] * 1000);
    }
}

module.exports.config = {
    name: "timer",
    aliases: ["settimer"]
}