// SupportBot Resource
// Pterodactyl All Servers List
// Creator: Griffindor

const Discord = require("discord.js");
const node = require('nodeactyl');
const Client = node.Client;
const bot = new Discord.Client()
const fs = require("fs")
const yaml = require('js-yaml');

const supportbot = yaml.load(fs.readFileSync('./supportbot-config.yml', 'utf8'));
const pterodactyl = yaml.load(fs.readFileSync('./sb-addons/settings/pterodactyl-config.yml', 'utf8'));

exports.run = async (Client, message, args, level, ) => {
    message.delete();

    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === `${pterodactyl.StaffRole}`)

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${pterodactyl.StaffRole}**`)
        .setColor(pterodactyl.colour)
    if (!staffGroup) return message.reply(rolemissing).catch(err => { console.error(err) })

    const donothaverole = new Discord.RichEmbed()
        .setDescription(`:x: Sorry! You cannot use this command with the role **${pterodactyl.StaffRole}**`)
        .setColor(supportbot.colour)
    if (!message.member.roles.has(staffGroup.id)) return message.reply(donothaverole)

    console.log(`\x1b[36m`, `${message.author} has executed ${supportbot.prefix}${pterodactyl.AllServers_Command}`)

    Client.login(pterodactyl.PANEL_URL, pterodactyl.API_KEY, (logged_in) => {
        console.log(logged_in);
    });

    Client.getAllServers().then((response) => {
        response.forEach(Element => {
            let TestEmbed = new discord.RichEmbed()
                .setDescription(`${Element}`)
            message.channel.send(TestEmbed);
        }).catch((error) => {
            console.log(error);
        })
    })
}

exports.help = {
    name: pterodactyl.AllServers_Command,
}