// SupportBot Resource
// Pterodactyl Send Command
// Creator: Griffindor

const Discord = require("discord.js");
const bot = new Discord.Client()
const Node = require('nodeactyl');

bot.settings = require("../settings.json");

exports.run = async (client, message, args, level, ) => {
    message.delete();

    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === `${bot.settings.staff}`)

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${bot.settings.staff}**`)
        .setColor(bot.settings.colour)
    if (!staffGroup) return message.reply(rolemissing).catch(err => { console.error(err) })

    const donothaverole = new Discord.RichEmbed()
        .setDescription(`:x: Sorry! You cannot use this command with the role **${bot.settings.staff}**`)
        .setColor(bot.settings.colour)
    if (!message.member.roles.has(staffGroup.id)) return message.reply(donothaverole)

    console.log(`\x1b[36m`, `${message.author} has executed ${bot.settings.prefix}${bot.settings.Send_Command}`)

    Node.login(bot.settings.PANEL_URL, bot.settings.API_KEY, "client").catch(error => {
        if (error) {
        }
    });

    let serverid = args[0];
    Node.stopServer(serverid);
};

exports.help = {
    name: bot.settings.StopServer_Command,
}