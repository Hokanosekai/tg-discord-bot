/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const { url } = require('../../config.json')

module.exports = {
    name: "share",
    description: "Share the bot",
    usage: null,
    cooldown: null,
    aliases: ["s", "sharebot", "sb"],

    run: async (message, bot, args, Discord) => {
        let share = new Discord.MessageEmbed()
            .setTitle('**Commande** `&share`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        await message.channel.send(share.setDescription("Clique [ICI](" + url + ") pour ajouter le bot sur un serveur"))
    }
}