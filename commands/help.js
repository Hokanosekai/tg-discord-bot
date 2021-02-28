const {prefix} = require('../config.json');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'List all commands or get info about a specific command',
    aliases: ['commands','h'],
    usage: '<command name>',
    cooldown: null,

    run:  async (message, args, bot) => {
        const { commands } = message.client

        let help = new Discord.MessageEmbed()
            .setTitle(`**Commande** \`${prefix}help\``)
            .setColor('#0099ff')
            .setFooter("demandé par @" + message.author.tag)

        message.delete()

        if (!args.length) {
            help.setDescription(':notepad_spiral: ----Toutes les commandes---- :notepad_spiral:\n\n ')

            const files = fs.readdirSync('commands').filter(file => file.endsWith('.js'))
            files.forEach(file => {
                help.addField(prefix+file.substr(0,file.length-3), `\`${prefix}h ${file.substr(0, file.length-3)}\` for more info`)
            })

            return message.channel.send(help)
        }

        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

        if (!command){
            help.setDescription('Cette commande n\'existe pas')
            return message.channel.send(help)
        }

        if (command.name) help.setTitle(`**Commande** \`${prefix}${command.name}\``)
        if (command.category) help.addField(`:file_folder: Catégory :file_folder: :\n`,`${command.category}\n`);
        if (command.aliases) help.addField(`:congratulations: Aliases :congratulations: :\n`,`${command.aliases.join(', ')}\n`);
        if (command.description) help.addField(`:pencil: Description :pencil: :\n`,`${command.description}\n`);
        if (command.usage) help.addField(`:keyboard: Usage :keyboard: :\n`,`\`${prefix}${command.name} ${command.usage}\`\n`);
        if (command.cooldown) help.addField(`:timer: Cooldown :timer: :\n`,`${command.cooldown} secondes`);

        message.channel.send(help);
    }
}