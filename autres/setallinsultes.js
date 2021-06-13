/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const Discord = require('discord.js')
const db = require('../Database')

module.exports = {
    name: 'setallinsultes',
    description: 'set insultes in db',

    run: async (message, args, bot) => {
        const { insultes } = require('../db.json')
        const exec = message.member

        insultes.forEach(ins => {
            console.log(ins)
            db.query("SELECT * FROM insultes", (err, res) => {
                let insul = []
                res.forEach(insN => {
                    insul.push(insN.name)
                })

                if (!insul.includes(ins)) {
                    const sql = `INSERT INTO insultes (name, sender) VALUES ?;`
                    const values = [
                        [ins,exec.displayName.replace(/[\u0800-\uFFFF]/g, '')]
                    ]
                    db.query(sql, [values], (err, res) => {
                        if (err) throw err
                        console.log(res.affectedRows, values)
                    })
                    message.channel.send('Les insultes ont bien été enregistrées")')
                }
            })
        })
    }
}