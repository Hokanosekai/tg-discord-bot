/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const db = require('../../Database')

module.exports = {
    name: "count",
    description: "Affiche le nombres d'insultes dites par le bot",
    cooldown: null,
    usage: null,

    run: async (message, bot, args) => {

        message.delete()
        //const { count } = require('/root/botHoka/TGBot/count.json')


        db.query("SELECT * FROM main;", (err, res) => {
            let count = new Discord.MessageEmbed()
                .setTitle('**Commande** `&count`')
                .setFooter("demandé par @" + message.author.tag)
                .setColor('#0099ff')
                .setDescription(res[0].count+' insultes dites par le bot')

            message.channel.send(count)
        })
    }
}