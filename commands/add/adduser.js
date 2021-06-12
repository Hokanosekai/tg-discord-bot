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
    name: "adduser",
    description: "Add a user",
    aliases: ["adduser", "addu"],
    usage: '<@user>',
    args: true,

    run: async (message, args, bot, Discord) => {
        const member = message.mentions.members.first();

        let add = new Discord.MessageEmbed()
            .setTitle('**Commande** `&adduser`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!member) return message.channel.send(add.setDescription('Veuillez mentionner un membre'));

        user.addUser(member.id, member.user.username).then(r => {
            if (r === 'exist') return message.channel.send(add.setDescription('Ce membre à déjà été ajouté'));
            return message.channel.send(add.setDescription('Ce membre à bien été ajouté'));
        });
    }
}