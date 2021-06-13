/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const fs = require('fs');
const { levels } = require('./config.json')

require('dotenv').config({path: '/root/botsdiscord/tgbot/.env'});

const token = process.env.DISCORD_TOKEN
const prefix = process.env.BOT_PREFIX

/*
Setup the client of the module Discord.js
 */
const bot = new Discord.Client({disableEveryone: true});

/**
 * Get the DataBase connection (Database.js)
 */
const DataBase = require("./Database");
const User = require('./objects/User');
const Insult = require('./objects/Insult');
const Channel = require('./objects/Channel');
const Main = require('./objects/Main');

const Database = new DataBase();
const db = Database.getConnection();

const user = new User(db);
const insult = new Insult(db);
const channel = new Channel(db);
const main = new Main(db)

/*
Create a new Collection for the command
 */
bot.commands = new Discord.Collection()

/**
 * Commands Handler
 */
fs.readdir('/root/botsdiscord/tgbot/commands/', (err, folders) => {
    if (err) return console.error(err)
    /*
    For all folders / categories
     */
    folders.forEach(folder => {
        /*
        Recovery of config files (.json) and command files (.js)
         */
        const loadeds = fs.readdirSync(`/root/botsdiscord/tgbot/commands/${folder}`).filter(jsonfile => jsonfile.endsWith('.json'))
        const files = fs.readdirSync(`/root/botsdiscord/tgbot/commands/${folder}/`).filter(file => file.endsWith('.js'))

        console.log(files)
        /*
        Get the constant if the category should be loaded
         */
        const { loaded } = require(`/root/botsdiscord/tgbot/commands/${folder}/${loadeds}`)
        console.log('\x1b[34m',`↳___________/${folder}/_____________↴`,'\x1b[37m')

        /*
        For all command files
         */
        files.forEach(file => {
            const command = require(`/root/botsdiscord/tgbot/commands/${folder}/${file}`)
            /*
            If the category is not loaded
             */
            if (!loaded) return console.log(`   ↳ ${file}`,'\x1b[31m',`not loaded`,'\x1b[37m')
            else {
                /*
                If the category is loaded add the command to the collection
                 */
                console.log(`   ↳ ${file}`,'\x1b[32m',`loaded`,'\x1b[37m')
                bot.commands.set(command.name, command)
            }
        })
    })
})


/**
 * Client ready event
 */
bot.on('ready', () => {
    console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','TG is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');

    bot.user.setStatus('dnd');

    /**
     * Set the activity of the client every 2sec
     */
    let i = 0;
    setInterval(async () => {

        const insultsCount = await insult.getInsultCount();
        const insultsSays = await main.getCount();

        const statuses = [
            `${insultsCount} nombres d'insultes`,
            `${insultsSays} insultes dites`,
            `by Hokanosekai`,
            `${insultsCount} nombres d'insultes`,
            `&help <command>`
        ];
        bot.user.setActivity(statuses[i]).then(() => {
            i = ++i % statuses.length;
        });
    }, 2000);
});

let answer;
/*
When the client receive a new message (from any discord server)
 */
bot.on('message',async message => {
    /*
     * If the author is a bot do nothing
     */
    if (message.author.id === '834214674227527720') return;
   
    /*
     * If the message received isn't a command (didn't start with the prefix '&')
     */
    if (!message.content.startsWith(prefix)) {

        /**
         * If channel is registered
         */
        const existChannel = await channel.getChannel(message.channel.id)
        if (!existChannel) return;

        /**
         * If user is registered
         */
        const existUser = await user.getUser(message.author.id);
        if (!existUser) return; // message.channel.send(`<@${message.author.id}> please use \`&addu <user>\` to register you`);


        answer = await insult.getRandomInsult();

        await main.addOne();

        let lastLvl
        user.getUser(message.author.id).then(async res => {
            let nb_message = res.nb_message + 1;
            let points = res.points;
            let lvl = res.level;

            const levelUp = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('**LEVEL UP**')

            await levels.forEach(level => {
                if (nb_message === level[1]) {
                    points += 10 * level[2];
                    lvl = level[0];
                    message.channel.send(levelUp.setDescription(`<@${message.author.id}> Congratulation, you have reached the level ${level[0]}`))
                }
                if (nb_message >= level[1]) {
                    lastLvl = level;
                }
            });

            points += 1 * lastLvl[2];

            user.updateLevel(nb_message, points, lvl, message.author.id).then(() => {
                return message.reply(answer);
            });
        });

    } else{
        /*
        If there is a prefix at the beginning of the message
         */
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        /*
        Retrieval of the command from the client's commands collection
         */
        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        /*
        If the command is send in dm do nothing
         */
        if (message.channel.type === 'dm') return message.reply('I can\'t execute this command inside DM');

        /*
        If the arguments of the command are incorrect
         */
        if (command.args && !args.length){
            let param = new Discord.MessageEmbed()
                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                .setColor('#0099ff')
                .setDescription(`${message.author}, Les arguments de la commande sont invalides`);
            return message.channel.send(param);
        }

        /*
        Run the command
         */
        try{
            command.run(message, args, bot, Discord);
            console.log(commandName)
        } catch (error) {
            console.error(error);
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                .setDescription(`${message.author}, Une erreur c'est produite lors de l'éxecution de la commande`)
            )
        }
    }
});

/*
Login the client to the Discord API
 */
bot.login(token);