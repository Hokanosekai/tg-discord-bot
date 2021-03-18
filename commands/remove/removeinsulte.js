/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const fs = require('fs')
const { perm } = require('/root/botHoka/TGBot/config.json')
const db = require('../../db')

module.exports = {
    name: "removeinsulte",
    description: "Remove an insulte from the list",
    aliases: ['rmins', 'rmi'],
    cooldown: null,
    usage: "<n° of the insulte>",
    args: true,

    run: async (message, args, bot) => {
        const exec = message.member

        message.delete()

        let remove = new Discord.MessageEmbed()
            .setTitle('**Commande** `&removeinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!exec.hasPermission(perm)) return message.send(remove.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!args || args.length > 1) return message.send(remove.setDescription('Veuillez renseigner corectement les arguments'))

        db.query("SELECT * FROM insultes", (err, res) => {
            let insultes = []
            res.forEach(insN => {
                insultes.push(insN.id)
            })

            console.log(insultes, args[0], insultes[args[0]-1])

            if (insultes[args[0]-1]){
                const sql = `DELETE FROM insultes WHERE id = ${args[0]}`
                db.query(sql, (err, res) => {
                    console.log(res.affectedRows)
                    db.query("ALTER TABLE insultes DROP id", (err, res) => {
                        if (err) throw err
                    })
                    db.query("ALTER TABLE  insultes ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST", (err, res) => {
                        if (err) throw err
                    })
                    message.channel.send(remove.setDescription("L'insulte à bien été supprimée"))
                })
            } else {
                message.channel.send(remove.setDescription("Cette insulte n'existe pas"))
            }

        })


        // if (insultes[args[0]-1]){
        //     const suppr = insultes[args[0]-1]
        //     insultes.splice(args[0]-1,1)
        //     fs.writeFileSync('/root/botHoka/TGBot/db.json', JSON.stringify(bot.db))
        //     console.log("insulte remove ",suppr)
        //     message.channel.send(remove.setDescription("L'insulte à bien été supprimée"))
        // } else {
        //     message.channel.send(remove.setDescription("Cette insulte n'existe pas"))
        // }
    }
}