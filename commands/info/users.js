/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const pagination = require('discord.js-pagination')
const db = require('../../db')

module.exports = {
    name: "users",
    description: "Affiche tous les utilisateurs déja enregistrées sur le bot",
    aliases: ["u"],
    usage: null,
    cooldown: null,

    run: async (message, args, bot) => {

        db.query("SELECT * FROM users", (err, res) => {
            const size = res.length
            const nb_pages = Math.ceil(size/25)
            const emojiList = ['⏪','⏩']
            const timeout = '120000'
            let pages = []

            let z = 0
            for (let i = 0; i < nb_pages; i++){
                let ins = new Discord.MessageEmbed()
                    .setTitle('**Commande db** `&users`')
                    .setFooter("demandé par @" + message.author.tag)
                    .setColor('#0099ff')

                let all = [':smiling_imp: ---- Tous les membres **'+ size +'** ---- :smiling_imp:\n']
                let x = 0
                while (x < 25){
                    if (z < size){
                        all.push(`**${res[z].id}.** `+ res[z].name +'  (level '+res[z].level+')\n')
                        //console.log(z+1,insultes[z])
                    }
                    z+=1
                    x+=1
                }
                pages.push(ins.setDescription(all))
            }

            pagination(message, pages, emojiList, timeout)
        })
    }
}