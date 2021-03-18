/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const db = require('../../db')

module.exports = {
    name: 'query',
    description: 'query all the users',
    usage: null,

    run: async (message, args, bot) => {
        const { levels } = require('../../config.json')
        const exec = message.member


        if (!args || args.length > 1) return message.send('Veuillez renseigner corectement les arguments')

        console.log(args[0])

        let points = 0
        let lvl = 0
        let msgs = 0;

        let nextLvl
        for (let nb = 0; nb < args[0]; nb++){
            nextLvl = []
            msgs = nb

            levels.forEach(level => {
                if (nb === level[1]) {
                    points += 10 * level[2]
                    lvl = level[0]
                }
                if (nb >= level[1]) {
                    nextLvl = level;
                }
            })

            points += 1 * nextLvl[2]
        }
        console.log(msgs,points,lvl,nextLvl)

    }
}