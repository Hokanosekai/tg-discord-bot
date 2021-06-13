/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */
const fs = require('fs');
const pagination = require('discord.js-pagination')

module.exports = {
    name: 'help',
    category: 'Config',
    description: 'List all commands or info about a specific command.',
    aliases: ['commands','h'],
    usage: '<command name>',

    run: async (message, args, bot, Discord) => {
        const { commands } = message.client;

        if (!args.length) {

            const pages = []


            const folders = fs.readdirSync('/root/botsdiscord/tgbot/commands').filter(folder => folder)
            for(const folder of folders){
                let help = new Discord.MessageEmbed()
                    .setTitle(`**Commande** \`&help\``)
                    .setColor('#0099ff')

                const files = fs.readdirSync(`/root/botsdiscord/tgbot/commands/${folder}`).filter(file => file.endsWith('.js'))
                const emotes = fs.readdirSync(`/root/botsdiscord/tgbot/commands/${folder}`).filter(file => file.endsWith('.json'))

                const { emote, name, loaded } = require(`../../commands/${folder}/${emotes}`)

                let all = []
                files.forEach(file => {
                    all.push('&'+file.substr(0,file.length-3))
                })

                all = all.join("\n")

                if(loaded){
                    help.addField(`${emote} ---- ${name} ---- ${emote}`,'\`'+all+'\n\`')
                }
                help.addField(`\nYou can view a specific command in send`,`\`&help <command name>\``);
                pages.push(help)
            }


            const emojiList = ['⏪','⏩']

            const timeout = '120000'

            return pagination(message, pages, emojiList, timeout)
        }

        let help = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setFooter("demandé par @" + message.author.tag)

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            help.setDescription('Cette commande n\'existe pas')
            return message.channel.send(help);
        }

        if (command.name) help.setTitle(`**Commande** \`&${command.name}\``)
        if (command.category) help.addField(`:file_folder: Catégory :file_folder: :\n`,`${command.category}\n`);
        if (command.aliases) help.addField(`:congratulations: Aliases :congratulations: :\n`,`${command.aliases.join(', ')}\n`);
        if (command.description) help.addField(`:pencil: Description :pencil: :\n`,`${command.description}\n`);
        if (command.usage) help.addField(`:keyboard: Usage :keyboard: :\n`,`\`&${command.name} ${command.usage}\`\n`);
        if (command.cooldown) help.addField(`:timer: Cooldown :timer: :\n`,`${command.cooldown || 3} secondes`);

        await message.channel.send(help);
    },
};