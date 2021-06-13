/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require ("discord.js");
 
module.exports = {
    name: 'ping',
    category: 'Config',
    description: 'Montre la latence du bot',
    aliases: ['p'],

    run: async (message, args, bot, Discord) => {
        let ping = new Discord.MessageEmbed()
            .setTitle('**Commande** `&ping`')
            .setDescription('je cherche')
            .setColor('#0099ff')

        const waiting = await message.channel.send(ping)
 
        let pingEmbed = new Discord.MessageEmbed()
            .setTitle('**Commande** `&ping`')
            .setColor('#0099ff')
            .setDescription("Latence du bot et de l'api discord.js")
            .addField("**Hokanosekai Bot**", "> `" + `${waiting.createdTimestamp - message.createdTimestamp}` + "ms`", true)
            .setFooter("demandé par @" + message.author.tag)

        waiting.edit(pingEmbed)
    }
}