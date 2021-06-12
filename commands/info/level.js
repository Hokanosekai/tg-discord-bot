/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const db = require('../../Database')
const { levels } = require('../../config.json')

module.exports = {
    name: "level",
    description: "Affiche votre niveau",
    aliases: ["lvl", "ll"],
    usage: null,
    cooldown: null,

    run: async (message, args, bot) => {

        message.delete()

        const member = message.mentions.members.first()
        const levelEmbed = new Discord.MessageEmbed()
            .setTitle("**Commande** \`&level\`")
            .setColor("RANDOM")

        let nextLvl
        let sql = ''
        let tag = ''

        if (!member) {
            sql = `SELECT * FROM users WHERE id_users = ${message.author.id}`
            tag = message.author.id
        } else {
            sql = `SELECT * FROM users WHERE id_users = ${member.id}`
            tag = member.id
        }

        db.query(sql, (err, res) => {
            if (err) throw err

            let nb_message = res[0].nb_message
            let points = res[0].points
            let lvl = res[0].level

            //console.log(nb_message,points,lvl)

            for (let i = 0; i < levels.length; i++) {
                if (nb_message >= levels[i][1]){
                    nextLvl = levels[i+1]
                }
            }

            let nbH = (nb_message * 25) / nextLvl[1]
            let strLvl = ''

            for (let i = 0; i < 25; i++) {
                if (i <= Math.round(nbH)) {
                    strLvl += `<:tgsqurare:821921464135188490>`
                } else {
                    strLvl += `<:tgline:821921598344003596>`
                }
            }

            const none = '<:tg_space:822537738024648704>'
            const percent = (nb_message * 100) / nextLvl[1]

            levelEmbed.setDescription(`\n<@${tag}> ${none}${none}${none}${none}${none} :trident: **LEVEL ${lvl}** :trident:\n\n\n`)

            levelEmbed.addField(`**${lvl}** ---> **${nextLvl[0]}**${none}${none}(${percent.toFixed(2)}%)`, ` **[**${strLvl}**]**`)
            levelEmbed.addField('Nombre de messages', `${nb_message}`, true)
            levelEmbed.addField('Nombre de Points', `${points}`,true)

            return message.channel.send(levelEmbed)
        })
    }
}