// SupportBot Resource
// Pterodactyl Send Command
// Creator: Griffindor

const Discord = require("discord.js");
const bot = new Discord.Client()
const Node = require('nodeactyl');
const pterodactyl = new Discord.Client()
bot.settings = require("../settings.json");
pterodactyl.settings = require("./settings/pterodactyl.json")

exports.run = async (client, message, args, level, ) => {
    message.delete();

    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === `${pterodactyl.settings.StaffRole}`)

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${pterodactyl.settings.StaffRole}**`)
        .setColor(bot.settings.colour)
    if (!staffGroup) return message.reply(rolemissing).catch(err => { console.error(err) })

    const donothaverole = new Discord.RichEmbed()
        .setDescription(`:x: Sorry! You cannot use this command with the role **${pterodactyl.settings.StaffRole}**`)
        .setColor(bot.settings.colour)
    if (!message.member.roles.has(staffGroup.id)) return message.reply(donothaverole)

    console.log(`\x1b[36m`, `${message.author} has executed ${bot.settings.prefix}${pterodactyl.settings.Send_Command}`)

    Node.login(pterodactyl.settings.Panel_URL, pterodactyl.settings.API_KEY, pterodactyl.settings.Client_Protocol).catch(error => {
        if (error) {
        }
    });

    let serverid = args[0];
    let command = args.slice(1).toString().replace(',', ' ');
    try {
        Node.sendCommand(serverid, command);
        const successEmbed = new Discord.RichEmbed()
            .setColor(bot.settings.colour)
            .setAuthor('Success')
            .setDescription('The command has been successfully sent to the server.')
            .setTimestamp()
            .setFooter(bot.settings.footer);
        message.channel.send(successEmbed);
    } catch (error) {
        const errorEmbed = new Discord.RichEmbed()
            .setColor(bot.settings.colour)
            .setAuthor('Error')
            .setDescription('The command can\'t be send to the server.')
            .setTimestamp()
            .setFooter(bot.settings.footer);
        message.channel.send(errorEmbed);
    }
}

exports.help = {
    name: pterodactyl.settings.Send_Command,
}