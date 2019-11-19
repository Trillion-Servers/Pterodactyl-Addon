// SupportBot Resource
// Pterodactyl Send Command
// Creator: Griffindor

const Discord = require("discord.js");
const bot = new Discord.Client()
const Node = require('nodeactyl');

bot.settings = require("../settings.json");

exports.run = async (client, message, args, level,) => {
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
    const CMDLog = new Discord.RichEmbed()
        .setTitle(bot.settings.Commands_Log_Title)
        .addField(`User`, `<@${message.author.id}>`)
        .addField(`Command`, bot.settings.Send_Command, true)
        .addField(`Executed At`, message.createdAt, true)
        .setColor(bot.settings.colour)
        .setFooter(bot.settings.footer)

    let CommandLog = message.guild.channels.find(LogsChannel => LogsChannel.name === `${bot.settings.Command_Log_Channel}`);
    if (!CommandLog) return message.channel.send(`:x: Error! Could not find the logs channel. **${bot.settings.Command_Log_Channel}**\nThis can be changed via ``settings.json```);

    CommandLog.send(CMDLog);
};

exports.help = {
    name: bot.settings.Send_Command,
}