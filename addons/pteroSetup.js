const Discord = require("discord.js");
const fs = require("fs");
const yaml = require('js-yaml');
const supportbot = yaml.load(fs.readFileSync('./supportbot-config.yml', 'utf8'));
const pteroaddon = yaml.load(fs.readFileSync('./addons/settings/pterodactyl-addon.yml', 'utf8'));

module.exports = {
    name: pteroaddon.PterodactylSetup,
    description: pteroaddon.PterodactylSetupDesc,

    execute(message, args, async) {

        const pterodactylsetupstart = new Discord.MessageEmbed()
            .setTitle("Pterodactyl Addon")
            .setDescription("Enter your Discord API Token.")
            .setColor(supportbot.WarningColour)

        const pterodactylsetupstart1 = new Discord.MessageEmbed()
            .setTitle("Pterodactyl Addon")
            .setDescription("Enter your Pterodactyl API Token.")
            .setColor(supportbot.WarningColour)

        const pterodactylsetupstart2 = new Discord.MessageEmbed()
            .setTitle("Pterodactyl Addon")
            .setDescription("Enter your Pterodactyl API Token.")
            .setColor(supportbot.WarningColour)

        const pterodactylsetupsuccess = new Discord.MessageEmbed()
            .setTitle("Pterodactyl Addon")
            .setDescription("Your Pterodactyl API info has been stored in Token.json")
            .setColor(supportbot.SuccessColour)

        let discord_api_token = []
        message.channel.send(pterodactylsetupstart)
        message.channel.awaitMessages(response => response.content.length > 2, {
            max: 1,
            time: 100000,
        }).then((collected) => {
            discord_api_token.push(collected.map(r => r.content));
            let pterodactyl_api_token = []
            message.channel.send(pterodactylsetupstart1)
            message.channel.awaitMessages(response => response.content.length > 2, {
                max: 1,
                time: 100000,
            }).then((collected) => {
                pterodactyl_api_token.push(collected.map(r => r.content));
                let pterodactyl_host = []
                message.channel.send(pterodactylsetupstart2)
                message.channel.awaitMessages(response => response.content.length > 2, {
                    max: 1,
                    time: 100000,
                }).then((collected) => {
                    pterodactyl_host.push(collected.map(r => r.content));
                    fs.writeFileSync("./addons/settings/token.json", '{\n    "Discord_API_Token": "' + discord_api_token + '", \n    "Pterodactyl_API_Token": "' + pterodactyl_api_token + '", \n    "Pterodactyl_Host": "' + pterodactyl_host + '"\n} ', (err) => {
                        if (!err) return;
                        console.error(err)
                    })
                    message.channel.send(pterodactylsetupsuccess)
                })
            })
        })
    }
}