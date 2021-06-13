/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const DataBase = require("../../Database");
const User = require("../../objects/User");

const Database = new DataBase();
const db = Database.getConnection();

const user = new User(db);

module.exports = {
    name: "removeuser",
    description: "Remove a user from the list",
    aliases: ['rmu'],
    cooldown: null,
    usage: "<n° of the user>",
    args: true,

    run: async (message, args, bot, Discord) => {
        const users = await user.getUser();

        let remove = new Discord.MessageEmbed()
            .setTitle('**Commande** `&removeuser`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!args || args.length > 1) return message.send(remove.setDescription('Veuillez renseigner corectement les arguments'))

        if (users[args[0]-1]){
            user.removeUser(args[0]).then(() => {
                return message.channel.send(remove.setDescription("Le membre à bien été supprimée"));
            });
        }
        else return message.channel.send(remove.setDescription("Ce membre n'existe pas"))
    }
}