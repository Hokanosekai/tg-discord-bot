const Discord = require('discord.js')
const fs = require("fs");
const { perm } = require('../config.json')

module.exports = {
    name: "addinsulte",
    description: "Add an insultes",
    aliases: ["addins", "addi"],
    usage: '<insultes>',
    cooldown: null,
    args: true,

    run: async (message, args, bot) => {
        const exec = message.member
        const insulte = args.slice().join(' ')

        message.delete()

        if (insulte === "@everyone"){
            return
        }

        let add = new Discord.MessageEmbed()
            .setTitle('**Commande** `&addinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!exec.hasPermission(perm)) return message.channel.send(add.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!insulte) return message.channel.send(add.setDescription('Veuillez renseigner une insulte'))

        let obj = bot.db.insultes

        if (!bot.db.insultes.includes(insulte)){
            obj.push(insulte)
            fs.writeFileSync('./db.json', JSON.stringify(bot.db))
            console.log("New insulte added ",insulte)
            message.channel.send(add.setDescription("L'insulte à bien été enregistrée"))
        } else {
            message.channel.send(add.setDescription("Cette insulte a déja été ajoutée"))
        }
    }
}