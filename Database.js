/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

const mysql = require('mysql')

class Database {
    conn
    host = ''
    user = ''
    password = ''
    database = ''

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
