const Discord = require('discord.js')
const pagination = require('discord.js-pagination')

module.exports = {
    name: "insultes",
    description: "Affiche toutes les insultes déja enregistrées sur le bot",
    aliases: ["i", "ins"],
    usage: null,
    cooldown: null,

    run: async (message, args, bot) => {

        const insultes = bot.db.insultes
        const size = insultes.length

        const nb_pages = Math.ceil(size/25)

        message.delete()

        let pages = []

        let z = 0
        for (let i = 0; i < nb_pages; i++){
            let ins = new Discord.MessageEmbed()
                .setTitle('**Commande** `&insultes`')
                .setFooter("demandé par @" + message.author.tag)
                .setColor('#0099ff')

            let all = [':smiling_imp: ---- Toutes les insultes ---- :smiling_imp:\n']
            let x = 0
            while (x < 25){
                if (z < size){
                    all.push(`**${z+1}.** `+ insultes[z]+'\n')
                    //console.log(z+1,insultes[z])
                }
                z+=1
                x+=1
            }
            pages.push(ins.setDescription(all))
        }

        const emojiList = ['⏪','⏩']

        const timeout = '120000'

        pagination(message, pages, emojiList, timeout)


        /*let insultes = new Discord.MessageEmbed()
            .setTitle('**Commande** `&insultes`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')
            .setDescription()

        message.delete()

        let all = [':smiling_imp: ---- Toutes les insultes ---- :smiling_imp:\n']
        bot.db.insultes.forEach((insulte, index) => {
            all.push(`**${index+1}.** `+ insulte+'\n')
        })

        message.channel.send(insultes.setDescription(all))*/
    }
}