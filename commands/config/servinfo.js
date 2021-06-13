/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
module.exports = {
    name: 'servinfo',
    category: 'Config',
	description: 'Information sur le server',
	aliases: ['si'],

    run: async (message, args, bot, Discord) => {
        let serv = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setTitle(`Server name: ${message.guild.name}`)
            .addField(`Total members:`,` ${message.guild.memberCount}`)
            .addField(`Créateur du Server`,`${message.guild.owner}`)
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')
        
        await message.channel.send(serv);
    }
}