/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const pagination = require('discord.js-pagination')

module.exports = {
    name: "channels",
    description: "Affiche tous les channels déja enregistrées sur le bot",
    aliases: ["chan"],
    usage: null,
    cooldown: null,

    run: async (message, args, bot) => {

        const insultes = bot.db.channels
        const size = insultes.length

        const nb_pages = Math.ceil(size/25)

        message.delete()

        let pages = []

        let z = 0
        for (let i = 0; i < nb_pages; i++){
            let ins = new Discord.MessageEmbed()
                .setTitle('**Commande** `&channels`')
                .setFooter("demandé par @" + message.author.tag)
                .setColor('#0099ff')

            let all = [':smiling_imp: ---- Tous les channels **'+ size +'** ---- :smiling_imp:\n']
            let x = 0
            while (x < 25){
                if (z < size){
                    if (bot.channels.cache.get(insultes[z])) all.push(`**${z+1}.** `+ bot.channels.cache.get(insultes[z]).name+'\n')
                    else all.push(`**${z+1}.** `+ insultes[z]+'\n')
                    //console.log(z+1,insultes[z])
                }
                z+=1
                x+=1
            }
            pages.push(ins.setDescription(all))
        }

        const emojiList = ['⏪','⏩']

        const timeout = '120000'

        pagination(message, pages, emojiList, timeout)

        /*let insultes = new Discord.MessageEmbed()
            .setTitle('**Commande** `&channels`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        message.delete()

        let all = [':smiling_imp: ---- Toutes les channels ---- :smiling_imp:\n']
        bot.db.channels.forEach((chan, index) => {
            all.push(`**${index+1}.** `+ bot.channels.cache.get(chan).name+'\n')
        })

        message.channel.send(insultes.setDescription(all))*/
    }
}