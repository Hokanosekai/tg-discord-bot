/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const fs = require("fs");
const { perm } = require('/root/botHoka/TGBot/config.json')

module.exports = {
    name: "adduser",
    description: "Add a user",
    aliases: ["adduser", "addu"],
    usage: '<@user>',
    cooldown: null,
    args: true,

    run: async (message, args, bot) => {
        const exec = message.member
        const member = message.mentions.members.first()

        message.delete()

        let add = new Discord.MessageEmbed()
            .setTitle('**Commande** `&adduser`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!exec.hasPermission(perm)) return message.channel.send(add.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!member) return message.channel.send(add.setDescription('Veuillez mentionner un membre'))

        let obj = bot.db.ids

        if (!bot.db.ids.includes(member.id)){
            obj.push(member.id)
            fs.writeFileSync('/root/botHoka/TGBot/db.json', JSON.stringify(bot.db))
            console.log("New user added ",member.user.username)
            message.channel.send(add.setDescription("Le membre à bien été enregistré"))
        } else {
            message.channel.send(add.setDescription("Ce membre a déja été ajouté"))
        }
    }
}