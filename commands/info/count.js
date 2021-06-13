/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const DataBase = require("../../Database");
const Main = require("../../objects/Main");

const Database = new DataBase();
const db = Database.getConnection();

const main = new Main(db);

module.exports = {
    name: "count",
    description: "Affiche le nombres d'insultes dites par le bot",

    run: async (message, bot, args, Discord) => {
        main.getCount().then(count => {
            let Embed = new Discord.MessageEmbed()
                .setTitle('**Commande** `&count`')
                .setFooter("demandé par @" + message.author.tag)
                .setColor('#0099ff')
                .setDescription(count+' insultes dites par le bot')

            message.channel.send(Embed);
        });
    }
}