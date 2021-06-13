/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const DataBase = require("../../Database");
const Insult = require("../../objects/Insult");

const Database = new DataBase();
const db = Database.getConnection();

const insult = new Insult(db);

module.exports = {
    name: "removeinsulte",
    description: "Remove an insulte from the list",
    aliases: ['rmins', 'rmi'],
    cooldown: null,
    usage: "<n° of the insult>",
    args: true,

    run: async (message, args, bot, Discord) => {
        const insults = await insult.getInsult();

        let remove = new Discord.MessageEmbed()
            .setTitle('**Commande** `&removeinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!args || args.length > 1) return message.send(remove.setDescription('Veuillez renseigner corectement les arguments'))

        if (insults[args[0]-1]){
            insult.removeInsult(args[0]).then(() => {
                return message.channel.send(remove.setDescription("L'insulte à bien été supprimée"));
            });
        }
        else return message.channel.send(remove.setDescription("Cette insulte n'existe pas"))
    }
}