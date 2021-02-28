const Discord = require('discord.js')
const fs = require('fs')
const { perm } = require('../config.json')

module.exports = {
    name: "removeinsulte",
    description: "Remove an insulte from the list",
    aliases: ['rmins', 'rmi'],
    cooldown: null,
    usage: "<n° of the insulte>",
    args: true,

    run: async (message, args, bot) => {
        const exec = message.member
        let insultes = bot.db.insultes

        message.delete()

        let remove = new Discord.MessageEmbed()
            .setTitle('**Commande** `&removeinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!exec.hasPermission(perm)) return message.send(remove.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!args || args.length > 1) return message.send(remove.setDescription('Veuillez renseigner corectement les arguments'))

        if (insultes[args[0]-1]){
            const suppr = insultes[args[0]-1]
            insultes.splice(args[0]-1,1)
            fs.writeFileSync('./db.json', JSON.stringify(bot.db))
            console.log("insulte remove ",suppr)
            message.channel.send(remove.setDescription("L'insulte à bien été supprimée"))
        } else {
            message.channel.send(remove.setDescription("Cette insulte n'existe pas"))
        }
    }
}