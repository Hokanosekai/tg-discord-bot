/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const { MessageEmbed, version: djsversion } = require('discord.js');
const os = require('os')
const ms = require('ms');
const cpuStat = require("cpu-stat");
const moment = require("moment")

 
 
module.exports = {
    name: 'botinfo',
    category: 'Config',
	description: 'Information sur le bot',
	aliases: ['bi'],
	usage: null,
    cooldown: null,
    run: async (message, bot, args) => {
        
        let { version } = require("discord.js");

        message.delete()

        let embedStats = new MessageEmbed()
            .setTitle("__**Informations sur le bot**__")
            .setColor("RANDOM")
            .addField("Créateur du bot :", "@Hokanosekai#0755")
            .addField("RAM Utilisée ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("En ligne depuis ⏲", `${ms(os.uptime() * 1000, { long: true })}`, true)
            //.addField("Utilisateurs :baby::skin-tone-2: ", `${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`, true)
            //.addField("Serveurs   ", `${bot.guilds.size}`, true)
            .addField("CPU ", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("Discord.js ", `\`v${djsversion}\``, true)
            .addField("Version ", `\`v${version}\``, true)
            .addField("Node.js ", `\`${process.version}\``, true)
            .addField("Architecture", `\`${os.arch()}\``, true)
            .addField("Platforme", `\`\`${os.platform()}\`\``, true)
            .addField("Language", "\`Javascript\`",true)
            .setFooter("HokanoSekai Bot")
    
        message.channel.send(embedStats)

    }
}
 
