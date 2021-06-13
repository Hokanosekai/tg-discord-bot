/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const DataBase = require("../../Database");
const User = require("../../objects/User");

const Database = new DataBase();
const db = Database.getConnection();

const user = new User(db);

const { levels } = require('../../config.json')

module.exports = {
    name: "level",
    description: "Affiche votre niveau",
    aliases: ["lvl", "ll"],
    usage: null,
    cooldown: null,

    run: async (message, args, bot, Discord) => {
        const member = message.mentions.members.first()
        const levelEmbed = new Discord.MessageEmbed()
            .setTitle("**Commande** \`&level\`")
            .setColor("RANDOM")

        let nextLvl

        let id = member? member.id : message.author.id;

        user.getUser(id).then((res) => {
            let nb_message = res.nb_message
            let points = res.points
            let lvl = res.level

            for (let i = 0; i < levels.length; i++) {
                if (nb_message >= levels[i][1]){
                    nextLvl = levels[i+1]
                }
            }

            let nbH = (nb_message * 25) / nextLvl[1]
            let strLvl = ''

            for (let i = 0; i < 25; i++) {
                if (i <= Math.round(nbH)) {
                    strLvl += `<:tgsqurare:821921464135188490>`
                } else {
                    strLvl += `<:tgline:821921598344003596>`
                }
            }

            const none = '<:tg_space:822537738024648704>'
            const percent = (nb_message * 100) / nextLvl[1]

            levelEmbed.setDescription(`\n<@${id}> ${none}${none}${none}${none}${none} :trident: **LEVEL ${lvl}** :trident:\n\n\n`)

            levelEmbed.addField(`**${lvl}** ---> **${nextLvl[0]}**${none}${none}(${percent.toFixed(2)}%)`, ` **[**${strLvl}**]**`)
            levelEmbed.addField('Nombre de messages', `${nb_message}`, true)
            levelEmbed.addField('Nombre de Points', `${points}`,true)

            return message.channel.send(levelEmbed)
        })
    }
}