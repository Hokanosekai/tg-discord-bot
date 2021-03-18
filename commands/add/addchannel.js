/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const fs = require("fs");
const { perm } = require("/root/botHoka/TGBot/config.json")

module.exports = {
    name: "addchannel",
    description: "Add a channel",
    aliases: ["addchan", "addc"],
    usage: '<@channel>',
    cooldown: null,
    args: true,

    run: async (message, args, bot) => {
        const exec = message.member
        const channel = message.mentions.channels.first()

        message.delete()

        let add = new Discord.MessageEmbed()
            .setTitle('**Commande** `&addinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!exec.hasPermission(perm)) return message.channel.send(add.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!channel) return message.channel.send(add.setDescription('Veuillez renseigner un channel'))

        let obj = bot.db.channels
        if (!bot.db.channels.includes(channel.id)){
            obj.push(channel.id)
            fs.writeFileSync('/root/botHoka/TGBot/db.json', JSON.stringify(bot.db))
            console.log("New channel added ",channel.name)
            message.channel.send(add.setDescription("Le channel à bien été enregistré"))
        } else {
            message.channel.send(add.setDescription("Ce channel a déja été ajouté"))
        }
    }
}