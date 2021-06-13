/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const pagination = require('discord.js-pagination');
const DataBase = require("../../Database");
const Insult = require("../../objects/Insult");

const Database = new DataBase();
const db = Database.getConnection();

const insult = new Insult(db);

module.exports = {
    name: "insultes",
    description: "Affiche toutes les insultes déja enregistrées sur le bot",
    aliases: ["i", "ins"],

    run: async (message, args, bot, Discord) => {

        insult.getInsult().then((res) => {
            const size = res.length
            const nb_pages = Math.ceil(size/25)
            const emojiList = ['⏪','⏩']
            const timeout = '120000'
            let pages = []

            let z = 0
            for (let i = 0; i < nb_pages; i++){
                let ins = new Discord.MessageEmbed()
                    .setTitle('**Commande db** `&insultes`')
                    .setFooter("demandé par @" + message.author.tag)
                    .setColor('#0099ff')

                let all = [':smiling_imp: ---- Toutes les insultes **'+ size +'** ---- :smiling_imp:\n']
                let x = 0
                while (x < 25){
                    if (z < size){
                        all.push(`**${res[z].id}.** `+ res[z].name +'\n')
                    }
                    z+=1
                    x+=1
                }
                pages.push(ins.setDescription(all))
            }

            pagination(message, pages, emojiList, timeout)
        });
    }
}