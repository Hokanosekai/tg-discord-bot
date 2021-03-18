/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const fs = require("fs");
const { perm } = require('/root/botHoka/TGBot/config.json')
const db = require('../../db')

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

        db.query("SELECT * FROM users", (err, res) => {
            let users = []
            res.forEach(u => {
                users.push(u.id)
            })

            if (!users.includes(member.id)) {
                const sql = `INSERT INTO users (id_users,name) VALUES ?;`
                const values = [
                    [member.id,member.displayName.replace(/[\u0800-\uFFFF]/g, '')]
                ]
                db.query(sql, [values], (err, res) => {
                    if (err) throw err
                    console.log(res.affectedRows, values)
                })
                message.channel.send(add.setDescription("Le membre à bien été enregistré"))
            } else {
                message.channel.send(add.setDescription("Ce membre a déja été ajouté"))
            }
        })

        if (!bot.db.ids.includes(member.id)){
            obj.push(member.id)
            fs.writeFileSync('/root/botHoka/TGBot/db.json', JSON.stringify(bot.db))
        }
    }
}