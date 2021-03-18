/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const fs = require("fs");
const { perm } = require('/root/botHoka/TGBot/config.json')
const db = require('../../db')

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

        let add = new Discord.MessageEmbed()
            .setTitle('**Commande** `&addinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        const none = ["@here", "@everyone", "amogus", "amongus", "among", "us", "ඞ", "sus", "амогус", "сус", "imposteur", "@TG"]
        let inIns = []
        none.forEach(non => {
            if (insulte.includes(non)) {
                inIns.push(1)
            } else {
                inIns.push(0)
            }
        })
        const isEvery = inIns.includes(1)
        const isLength = insulte.length > 100
        if (isLength || isEvery){
            return message.channel.send(add.setDescription("Non c\'est pas bien"))
        }

        if (!exec.hasPermission(perm)) return message.channel.send(add.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!insulte) return message.channel.send(add.setDescription('Veuillez renseigner une insulte'))

        //let obj = bot.db.insultes

        db.query("SELECT * FROM insultes", (err, res) => {
            let insultes = []
            res.forEach(insN => {
                insultes.push(insN.name)
            })

            if (!insultes.includes(insulte)) {
                const sql = `INSERT INTO insultes (name, sender) VALUES ?;`
                const values = [
                    [insulte,exec.displayName.replace(/[\u0800-\uFFFF]/g, '')]
                ]
                db.query(sql, [values], (err, res) => {
                    if (err) throw err
                    console.log(res.affectedRows, values)
                })
                message.channel.send(add.setDescription("L'insulte à bien été enregistrée"))
            } else {
                message.channel.send(add.setDescription("Cette insulte a déja été ajoutée"))
            }

        })
        // if (!bot.db.insultes.includes(insulte)) {
        //     //obj.push(insulte)
        //     //fs.writeFileSync('/root/botHoka/TGBot/db.json', JSON.stringify(bot.db))
        //     console.log("New insulte added ", insulte)
        //     message.channel.send(add.setDescription("L'insulte à bien été enregistrée"))
        // } else {
        //     message.channel.send(add.setDescription("Cette insulte a déja été ajoutée"))
        // }

    }
}