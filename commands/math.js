const Discord = require('discord.js');
const botconfig = require('../botconfig.json')

module.exports.run = async (bot, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    
    if(!args[0] && !args[1] && !args[2]) {return message.channel.send("Usage: (x + - * / root factorial) and optionally what decimal value you want to round to.")
} else {
        let num1 = parseFloat(args[0]);
        let num2 = parseFloat(args[2]);
        let operator = args[1];

        let answer;
        if(!typeof(num1) === 'number' || !typeof(num2) === 'number') return message.channel.send("Please only enter numbers for this command to work");
        
        switch(operator) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            case '/':
                answer = num1 / num2;
                break;
            case '^':
                answer = Math.pow(num1, num2);
                break;
            case 'root':
                answer = Math.pow(num2, 1/num1);
                if(Math.sign(num1) === -1 || Math.sign(num2) === -1) return message.channel.send('Input values can only be positive for this command to work. Please only insert positive values');
                break;
            case 'factorial':
                if(!Number.isInteger(num1)) return message.channel.send(`Error: The Input value '${num1}' isn't an integer`);
                let product = num1;
                let iterator = num1 - 1;
                if(!iterator > 0) return answer = 1;
                while(iterator > 0) {
                    product *= iterator
                    iterator--
                };

                answer = product;
                break;
            default:
                message.channel.send("Incorrect operators, please use + - * / ^ = root or factorial");
                break;
        }
        if(!args[3]) {
        if(Number.isInteger(answer)) {
            message.channel.send(answer);
        } else if(Number.isInteger(answer.toFixed(5))){
            message.channel.send(answer)
        } else {
            message.channel.send(answer.toFixed(5));
        }
        }if(args[3]) {
            message.channel.send(answer.toFixed(args[3]));
        }
    }
}

module.exports.config = {
    name: "math",
    aliases: ["maths", "dothemath"]
}