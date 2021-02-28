const Discord = require('discord.js')
const fs = require("fs");
const { token,prefix } = require('./config.json')

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()
bot.db = require('./db.json')

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const command = require(`./commands/${file}`)
        console.log(`   => ${file}`,'\x1b[32m',`loaded`,'\x1b[37m')
        bot.commands.set(command.name, command)
    })
});

bot.on('ready', () => {
    console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','TG is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');
});

bot.on('message',async message => {
    if (message.author.bot) return

    if (!message.content.startsWith(prefix)) {
        //console.log(message.content, message.author.tag, message.channel.name)
        const answer = bot.db.insultes[Math.floor(Math.random() * bot.db.insultes.length)]

        const isIn = bot.db.ids.includes(message.author.id)
        const isChannel = bot.db.channels.includes(message.channel.id)

        //console.log(isIn,message.author.id,bot.db.ids)
        //console.log(isChannel,message.channel.id,bot.db.channels)

        if(isIn && isChannel){
            message.channel.send("<@"+message.author+"> "+answer)
        }

    } else{
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if (!command) return message.channel.send(new Discord.MessageEmbed().setTitle(`**Commande** \`${prefix}${commandName}\``))
        if (message.channel.type === 'dm') return message.reply('I can\'t execute this command inside DM')

        if (command.args && !args.length){
            let param = new Discord.MessageEmbed()
                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                .setColor('#0099ff')
                .setDescription(`${message.author}, Les arguments de la commande sont invalides`)
            if (command.usage){
                param.setDescription(`${message.author}, Les arguments de la commande sont invalides \nVeuillez entrer des arguments du type\n\`${prefix}${command.name} ${command.usage}\``)
            }
            message.delete()
            message.channel.send(param)
        }

        try{
            command.run(message, args, bot)
        } catch (error) {
            console.error(error)
            message.channel.send(new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                .setDescription(`${message.author}, Une erreur c'est produite lors de l'éxecution de la commande`)
            )
        }
    }
});

bot.login(token);

/**
    moi : 464810880035717122
    netflix : 808344438890954782
    snoop doge : 776225290036314112
    tits : 756148625507221608
    stefan : 337700222358781954
    romain : 205986134860234762
    tai : 348195562987978766

*/