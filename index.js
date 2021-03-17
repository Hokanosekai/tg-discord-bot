/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const fs = require('fs');
const { token,prefix } = require('/root/botHoka/TGBot/config.json')
const count_json  = require('/root/botHoka/TGBot/count.json')



/*
Setup the client of the module Discord.js
 */
const bot = new Discord.Client({disableEveryone: true});


// There are two databases, one in the project (db.json) named
// db in all the commentary
// and one on the bot's vps named DB
// The connection to the latter is recovered via the file (db.js)
// TODO : pass all the info from db to DB
/*
Get the DataBase connection (db.js)
 */
const db = require('../../WEB/Node/test/db')
/*
Setup the database of the client from (db.json)
 */
bot.db = require('/root/botHoka/TGBot/db.json')



/*
Create a new Collection for the command
 */
bot.commands = new Discord.Collection()



/*
Retrieval of all categories and their commands
 */
fs.readdir('/root/botHoka/TGBot/commands/', (err, folders) => {
    if (err) return console.error(err)
    /*
    For all folders / categories
     */
    folders.forEach(folder => {
        /*
        Recovery of config files (.json) and command files (.js)
         */
        const loadeds = fs.readdirSync(`/root/botHoka/TGBot/commands/${folder}`).filter(jsonfile => jsonfile.endsWith('.json'))
        const files = fs.readdirSync(`/root/botHoka/TGBot/commands/${folder}/`).filter(file => file.endsWith('.js'))

        /*
        Get the constant if the category should be loaded
         */
        const { loaded } = require(`./commands/${folder}/${loadeds}`)
        console.log('\x1b[34m',`↳___________/${folder}/_____________↴`,'\x1b[37m')

        /*
        For all command files
         */
        files.forEach(file => {
            const command = require(`./commands/${folder}/${file}`)
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



/*
When the client is ready
 */
bot.on('ready', () => {
    console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','TG is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');

    /*
    Set the status of the client to "do not disturb"
     */
    bot.user.setStatus('dnd')

    /*
    Set the activity of the client every 2sec
     */
    let i = 0
    setInterval(() => {
        /*
        Select the count of insults in the DB
         */
        db.query("SELECT COUNT(id) AS l FROM insultes", (err, res) => {

            /*
            Select the count of insults said
             */
            db.query("SELECT count FROM main", (err, rest) => {

                const statuses = [
                    `${res[0].l} nombres d'insultes`,
                    `${rest[0].count} insultes dites`,
                    `by Hokanosekai`,
                    `${res[0].l} nombres d'insultes`,
                    `&help <command>`
                ]
                bot.user.setActivity(statuses[i])
                i = ++i % statuses.length
            })
        })
    }, 2000)
});




/*
When the client receive a new message (from any discord server)
 */
bot.on('message',async message => {
    /*
    If the author is a bot do nothing
     */
    if (message.author.bot) return

    /*
    If the message received isn't a command (didn't start with the prefix '&')
     */
    if (!message.content.startsWith(prefix)) {
        //console.log(message.content, message.author.tag, message.channel.name)

        /*
        Select a random insults in the db
         */
        const answer = bot.db.insultes[Math.floor(Math.random() * bot.db.insultes.length)]
        /*
        Get the mentioned user
         */
        const memb = message.mentions.members.first()

        /*
        If the message author is in the db
         */
        const isIn = bot.db.ids.includes(message.author.id)
        /*
        If the channel of the message is in the db
         */
        const isChannel = bot.db.channels.includes(message.channel.id)
        /*
        If the bot is mentioned and the channel of the message isn't in the db
         */
        let isMentionned
        if (memb != null){
             isMentionned = memb.user.id === '811257005946699877' && !isChannel
        }


        //console.log(isIn,message.author.id,bot.db.ids)
        //console.log(isChannel,message.channel.id,bot.db.channels)
        //console.log(isMentionned,'811257005946699877',memb.user.id)


        if(isIn && isChannel){
            /*
            Add one to the count of insults said to the DB
             */
            db.query("SELECT * FROM main;", (err, res) => {
                let y = res[0].count + 1
                db.query(`UPDATE main SET count = ${y} WHERE id = 1;`, (err) => {
                    if (err) throw err
                })
            })

            /*
            TODO : Level system (in progress)
             */
            db.query(`SELECT nb_message as msg, points, level FROM users WHERE id_users = ${message.author.id};`, (err, res) => {
                let nb_message = res[0].msg + 1
                let points = res[0].points
                let lvl = res[0].level
                const { levels } = require('./config.json')

                levels.forEach(level => {
                    console.log(level)
                    if (nb_message === level[0]) {
                        points += 10 * level[1]
                        message.channel.send()
                    }
                    if (lvl === level){
                        points += 1 * level[1]
                    }
                })
            })

            /*
            Add one to the count of insults said to the db
             */
            count_json.count += 1
            fs.writeFileSync('/root/botHoka/TGBot/count.json', JSON.stringify(count_json))
            /*
            Send the insults in the channel
             */
            message.channel.send("<@"+message.author+"> "+answer)
        }

        if (isMentionned){
            /*
            Add one to the count of insults said to the DB
             */
            db.query("SELECT * FROM main;", (err, res) => {
                let y = res[0].count + 1
                db.query(`UPDATE main SET count = ${y} WHERE id = 1;`, (err) => {
                    if (err) throw err
                })
            })

            /*
            Add one to the count of insults said to the db
             */
            count_json.count += 1
            fs.writeFileSync('/root/botHoka/TGBot/count.json', JSON.stringify(count_json))
            /*
            Send the insults in the channel
             */
            message.channel.send(answer)
        }

    } else{
        /*
        If there is a prefix at the beginning of the message
         */
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        /*
        Retrieval of the command from the client's commands collection
         */
        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        /*
        If the command doesn't exist in the collection
         */
        if (!command) return message.channel.send(new Discord.MessageEmbed().setTitle(`**Commande** \`${prefix}${commandName}\``))

        /*
        If the command is send in dm do nothing
         */
        if (message.channel.type === 'dm') return message.reply('I can\'t execute this command inside DM')

        /*
        If the arguments of the command are incorrect
         */
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

        /*
        Run the command
         */
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

/*
Login the client to the Discord API
 */
bot.login(token);