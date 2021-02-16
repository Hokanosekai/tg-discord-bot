const Discord = require('discord.js')
const { token } = require('./config.json')
const { id,insultes } = require('./db.json')

const bot = new Discord.Client({disableEveryone: true});

const cooldowns = new Discord.Collection();
bot.on('message',async message => {
    const answer = insultes[Math.floor(Math.random() * insultes.length)]

    if(id.includes(message.author)){
        message.channel.send(message.author.tag+" "+answer)
    }
});

bot.on('ready', () => {
    console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','TG is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');
});

bot.login(process.env.TOKEN);

/**
    moi : 464810880035717122
    netflix : 808344438890954782
    snoop doge : 776225290036314112
    tits : 756148625507221608
    stefan : 337700222358781954
    romain : 205986134860234762
    tai : 348195562987978766

*/