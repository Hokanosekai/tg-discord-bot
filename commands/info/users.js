/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const pagination = require('discord.js-pagination')

module.exports = {
    name: "users",
    description: "Affiche tous les utilisateurs déja enregistrées sur le bot",
    aliases: ["u"],
    usage: null,
    cooldown: null,

    run: async (message, args, bot) => {

        const users = bot.db.ids
        const size = users.length

        const nb_pages = Math.ceil(size/25)

        message.delete()

        let pages = []

        let z = 0
        for (let i = 0; i < nb_pages; i++){
            let ins = new Discord.MessageEmbed()
                .setTitle('**Commande** `&users`')
                .setFooter("demandé par @" + message.author.tag)
                .setColor('#0099ff')

            let all = [':smiling_imp: ---- Tous les users **'+ size +'** ---- :smiling_imp:\n']
            let x = 0
            while (x < 25){
                if (z < size){
                    const member = bot.users.cache.get(users[z])
                    if (!member){
                        all.push(`**${z+1}.** `+ users[z]+'\n')
                    } else {
                        all.push(`**${z+1}.** `+ member.tag+'\n')
                    }
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
            .setTitle('**Commande** `&users`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')
            .setDescription()

        message.delete()

        let all = [':smiling_imp: ---- Toutes les utilisateurs ---- :smiling_imp:\n']
        bot.db.ids.forEach((id, index) => {
            const member = bot.users.cache.get(id)
            if (!member){
                all.push(`**${index+1}.** `+id+'\n')
            } else {
                all.push(`**${index+1}.** `+member.tag+'\n')
            }
        })

        message.channel.send(insultes.setDescription(all))*/
    }
}