/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const mysql = require('mysql')

class Database {
    conn
    host = '178.32.252.139'
    user = 'root'
    password = 'V5miuq3hsRkGL32'
    database = 'tg_bot'

    constructor() {
        this.conn = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        this.conn.connect(err => {
            console.error(err);
        });
    }

    getConnection = () => {
        return this.conn
    }
}

module.exports = Database