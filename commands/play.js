const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.reply("Error, please enter a voice a channel to use the command");
 

    let connection = await voiceChannel.join();
   
    const dispatcher = connection.playStream(ytdl(args[0]))
    .on('end', () => {
        message.channel.send('Steam ended. Left the Channel');
        voiceChannel.leave();
    }).on('error', error => {
        console.error(error);
    });
    dispatcher.setVolume(0.5);
}

module.exports.config = {
    name: "play",
    aliases: ["play"]
}