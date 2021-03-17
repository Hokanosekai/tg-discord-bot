/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const mysql = require('mysql')

/*
Create a new connection to the DB
 */
var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'root',
    database: 'tg_bot'
})

/*
Try to connect to the DB
 */
con.connect((err => {
    console.error(err)
}))

/*
Exports the connection to the DB to reuse it later
 */
module.exports = con

