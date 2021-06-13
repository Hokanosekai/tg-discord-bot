/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const DataBase = require("../../Database");
const Channel = require("../../objects/Channel");

const Database = new DataBase();
const db = Database.getConnection();

const channel = new Channel(db);

module.exports = {
    name: "removechannel",
    description: "Remove a channel from the list",
    aliases: ['rmchan', 'rmc'],
    usage: "<n° of the channel>",
    args: true,

    run: async (message, args, bot, Discord) => {
        const channels = await channel.getChannel()

        let remove = new Discord.MessageEmbed()
            .setTitle('**Commande** `&removeinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!args || args.length > 1) return message.send(remove.setDescription('Veuillez renseigner corectement les arguments'));

        if (channels[args[0]-1]){
            channel.removeChannel(args[0]).then(() => {
                return message.channel.send(remove.setDescription("Le channel à bien été supprimée"));
            });
        }
        else return message.channel.send(remove.setDescription("Ce channel n'existe pas"))
    }
}