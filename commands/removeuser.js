const Discord = require('discord.js')
const fs = require('fs')
const { perm } = require('../config.json')

module.exports = {
    name: "removeuser",
    description: "Remove a user from the list",
    aliases: ['rmu'],
    cooldown: null,
    usage: "<@user>",
    args: true,

    run: async (message, args, bot) => {
        const exec = message.member
        let users = bot.db.ids

        message.delete()

        let remove = new Discord.MessageEmbed()
            .setTitle('**Commande** `&removeuser`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!exec.hasPermission(perm)) return message.send(remove.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!args || args.length > 1) return message.send(remove.setDescription('Veuillez renseigner corectement les arguments'))

        if (users[args[0]-1]){
            const suppr = users[args[0]-1]
            users.splice(args[0]-1,1)
            fs.writeFileSync('./db.json', JSON.stringify(bot.db))
            console.log("user remove ",suppr)
            message.channel.send(remove.setDescription("L'user à bien été supprimée"))
        } else {
            message.channel.send(remove.setDescription("Ce user n'existe pas"))
        }
    }
}