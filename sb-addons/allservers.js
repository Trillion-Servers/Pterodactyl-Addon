// SupportBot Resource
// Pterodactyl All Servers List
// Creator: Griffindor

const Discord = require("discord.js");
const pterodactyl = new Discord.Client()
const Node = require('nodeactyl');

bot.settings = require("../settings.json");
pterodactyl.settings = require("./settings/pterodactyl.json")

exports.run = async (client, message, args, level, ) => {
    message.delete();

    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === `${pterodactyl.settings.StaffRole}`)

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${pterodactyl.settings.StaffRol}**`)
        .setColor(pterodactyl.settings.colour)
    if (!staffGroup) return message.reply(rolemissing).catch(err => { console.error(err) })

    const donothaverole = new Discord.RichEmbed()
        .setDescription(`:x: Sorry! You cannot use this command with the role **${pterodactyl.settings.StaffRole}**`)
        .setColor(pterodactyl.settings.colour)
    if (!message.member.roles.has(staffGroup.id)) return message.reply(donothaverole)

    console.log(`\x1b[36m`, `${message.author} has executed ${bot.settings.prefix}${pterodactyl.settings.AllServers_Command}`)


    const serversEmbed = new Discord.RichEmbed()
        .setColor(pterodactyl.settings.colour)
        .setAuthor('Servers list')
        .setTimestamp()
        .setFooter(pterodactyl.settings.footer);
    
    Node.login(pterodactyl.settings.PANEL_URL, pterodactyl.settings.API_KEY, "client").catch(error => {
        if (error) {
        }
    });

    Node.getAllServers().then(response => {
        response['data'].forEach(function (element) {
            serversEmbed.addField(
                "__" + element.attributes.name + "__",
                "***ID*** : " + element.attributes.identifier +
                "\n***RAM*** : " + element.attributes.limits.memory);
        });
        message.channel.send(serversEmbed);
    });

    const CMDLog = new Discord.RichEmbed()
        .setTitle(pterodactyl.settings.Commands_Log_Title)
        .addField(`User`, `<@${message.author.id}>`)
        .addField(`Command`, pterodactyl.settings.AllServers_Command, true)
        .addField(`Executed At`, message.createdAt, true)
        .setColor(pterodactyl.settings.colour)
        .setFooter(pterodactyl.settings.footer)

    let CommandLog = message.guild.channels.find(LogsChannel => LogsChannel.name === `${pterodactyl.settings.Command_Log_Channel}`);
    if (!CommandLog) return message.channel.send(`:x: Error! Could not find the logs channel. **${pterodactyl.settings.Command_Log_Channel}**\nThis can be changed via ``settings.json```);

    CommandLog.send(CMDLog);
};

exports.help = {
    name: pterodactyl.settings.AllServers_Command,
}