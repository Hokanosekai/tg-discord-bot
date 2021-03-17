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

    run: async (message, bot, args) => {
        const { insultes } = require('../../db.json')
        const exec = message.member

        db.query("SELECT * FROM insultes", (err, res) => {
            let insultee = []
            res.forEach(insN => {
                insultee.push(insN.name)
            })
            insultes.forEach(insulte => {
                if (!insultee.includes(insulte)) {
                    const sql = `INSERT INTO insultes (name, sender) VALUES ?;`
                    const values = [
                        [insulte.replace(/[\u0800-\uFFFF]/g, ''),exec.displayName.replace(/[\u0800-\uFFFF]/g, '')]
                    ]
                    db.query(sql, [values], (err, res) => {
                        if (err) throw err
                        console.log(res.affectedRows, values)
                    })
                }
            })
        })
    }
}