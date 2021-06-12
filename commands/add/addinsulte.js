/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const DataBase = require('../../Database')
const Insult = require("../../objects/Insult");

const Database = new DataBase();
const db = Database.getConnection();

const insult = new Insult(db);

module.exports = {
    name: "addinsulte",
    description: "Add an insultes",
    aliases: ["addins", "addi"],
    usage: '<insultes>',
    args: true,

    run: async (message, args, bot, Discord) => {
        const exec = message.member
        const insulte = args.slice().join(' ')

        let add = new Discord.MessageEmbed()
            .setTitle('**Commande** `&addinsulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        if (!insulte) return message.channel.send(add.setDescription('Veuillez renseigner une insulte'));

        const none = ["@here", "@everyone", "amogus", "amongus", "among", "us", "ඞ", "sus", "амогус", "сус", "imposteur", "@TG"];
        none.forEach(non => {
            if (insulte.includes(non)) return message.channel.send(add.setDescription("Non c\'est pas bien"));
        })

        if (insulte.length > 100) return message.channel.send(add.setDescription("Non c\'est pas bien"));

        insult.addInsult(insulte, exec.user.tag).then(r => {
            if (r === 'exist') return message.channel.send(add.setDescription("L'insulte à bien été enregistrée"));
            return message.channel.send(add.setDescription("Cette insulte a déja été ajoutée"));
        });
    }
}