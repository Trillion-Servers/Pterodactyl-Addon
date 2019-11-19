// SupportBot Resource
// Pterodactyl All Servers List
// Creator: Griffindor

const Discord = require("discord.js");
const pterodactyl = new Discord.Client()
const Node = require('nodeactyl');
const bot = new Discord.Client()

pterodactyl.settings = require("./settings/pterodactyl.json")
bot.settings = require("../settings.json");

exports.run = async (client, message, args, level, ) => {
    message.delete();

    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === `${pterodactyl.settings.StaffRole}`)

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${pterodactyl.settings.StaffRole}**`)
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
        .setFooter(bot.settings.footer);

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
}

exports.help = {
    name: pterodactyl.settings.AllServers_Command,
}