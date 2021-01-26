const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({ disableEveryone: true });
const { token } = require('./botconfig.json');
const colours = require('./colours.json');
const botconfig = require('./botconfig.json');
let xp = require('./xp.json');
let warnings = require('./warnings.json');
require('./util/eventHandler')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        return console.log("Couldn't find commands")
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name);
        })
    })
})

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    
    if(!xp[message.author]) {
        xp[message.author] = {
            level: 1,
            xp: 0,
            messages: 1
        }
    }
    
    let xpAdd = Math.round((Math.random() * 15) + 5);
    let currentLevel = xp[message.author].level;
    let currentXp = xp[message.author].xp;
    let messages = xp[message.author].messages

    let nextLevelXp = 1000 * (1.1 ** (currentLevel - 1));
    currentXp += xpAdd;
    messages++
    if(currentXp > nextLevelXp) {
        currentLevel++;
        currentXp -= nextLevelXp;
        nextLevelXp = Math.floor(1000 * (1.1 ** (currentLevel - 1)));

        let lEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username} Levels`, message.guild.iconURL)
        .setTitle(`**${message.author.username} has leveled up!**`)
        .setColor(colours.green_light)
        .setThumbnail(message.author.displayAvatarURL)
        .addField('**New Level**', currentLevel, true)
        .addField('**Previous Level**', currentLevel - 1, true)
        .addField('**XP Required for next level**', nextLevelXp)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
        message.channel.send(lEmbed);
    }
    xp[message.author] = {
        level: currentLevel,
        xp: currentXp,
        messages: messages
    }
    fs.writeFile('./xp.json', JSON.stringify(xp), (err) => {
        if(err) console.log(err);
    });
})

bot.on('message', async message => {
    if(message.author.bot || message.channel.type === 'dm') return;

    let user = message.author.id;

    if(!warnings[user]){
        warnings[user] = {
            total_warnings: 0,
            total_kicks: 0
        };
    }

    fs.writeFile('./warnings.json', JSON.stringify(warnings), (err) => {
        if(err) console.log(err);
    });

})

bot.on('message', async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));

    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandFile = bot.commands.get(cmd.slice(prefix.length))  || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandFile) commandFile.run(bot, message, args);
})

bot.on("message", message => {
    if(message.content.toLowerCase() === "za warudo") {
    
    let moderators = message.guild.roles.find(role => role.name === "Moderators")
    let weirdos = message.guild.roles.find(role => role.name === "Weirdos");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Oof.");

        message.channel.send("Time has stopped moving")
        message.channel.overwritePermissions(weirdos, {
            SEND_MESSAGES: false
        })
        .then(setTimeout(() => {
            message.channel.send("Time will now begin moving")
            message.channel.overwritePermissions(weirdos, {
                SEND_MESSAGES: true
        })
    }, 60000))
    }
})

bot.on("message", message => {
    if(message.content.toLowerCase() === "arsene*") {
        return message.channel.send("Arson*");
    }
    if(message.content.toLowerCase() === "wake up arsonbot!") {
        return message.channel.send("Leave me alone I'm trying to sleep.");
    }
})

bot.login(token);