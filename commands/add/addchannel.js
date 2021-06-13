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
    name: "addchannel",
    description: "Add a channel",
    aliases: ["addchan", "addc"],
    usage: '<@channel>',
    args: true,

    run: async (message, args, bot, Discord) => {
        const mention = message.mentions.channels.first()

        let add = new Discord.MessageEmbed()
            .setTitle('**Commande** `&addinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!mention) return message.channel.send(add.setDescription('Veuillez renseigner un channel'))

        channel.addChannel(mention.name, mention.id).then(r => {
            if (r === 'exist') return message.channel.send(add.setDescription("Ce channel a déja été ajouté"));
            return message.channel.send(add.setDescription("Le channel à bien été enregistré"));
        });
    }
}