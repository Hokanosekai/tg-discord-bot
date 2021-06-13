/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const pagination = require('discord.js-pagination')
const DataBase = require("../../Database");
const Channel = require("../../objects/Channel");

const Database = new DataBase();
const db = Database.getConnection();

const channel = new Channel(db);

module.exports = {
    name: "channels",
    description: "Affiche tous les channels déja enregistrées sur le bot",
    aliases: ["chan"],

    run: async (message, args, bot, Discord) => {

        channel.getChannel().then(res => {
            const size = res.length;
            const nb_pages = Math.ceil(size/25);
            const emojiList = ['⏪','⏩'];
            const timeout = '120000';
            let pages = [];

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
                        all.push(`**${z+1}.** `+ res[z].name+'\n')
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