const Discord = require('discord.js')
const fs = require('fs')
const { perm } = require('../config.json')

module.exports = {
    name: "removechannel",
    description: "Remove a channel from the list",
    aliases: ['rmchan', 'rmc'],
    cooldown: null,
    usage: "<n° of the channel>",
    args: true,

    run: async (message, args, bot) => {
        const exec = message.member
        let channels = bot.db.channels

        message.delete()

        let remove = new Discord.MessageEmbed()
            .setTitle('**Commande** `&removeinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!exec.hasPermission(perm)) return message.send(remove.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!args || args.length > 1) return message.send(remove.setDescription('Veuillez renseigner corectement les arguments'))

        if (channels[args[0]-1]){
            const suppr = channels[args[0]-1]
            channels.splice(args[0]-1,1)
            fs.writeFileSync('./db.json', JSON.stringify(bot.db))
            console.log("channel remove ",suppr.displayName)
            message.channel.send(remove.setDescription("Le channel à bien été supprimée"))
        } else {
            message.channel.send(remove.setDescription("Ce channel n'existe pas"))
        }
    }
}