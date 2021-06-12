/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

class Insult {
    conn

    id
    name
    sender

    constructor(db) {
        this.conn = db;
    }

    getInsult = (name = undefined) => {
        let sql = `SELECT * FROM insultes WHERE name${name}`;
        if (!name) sql = `SELECT * FROM insultes`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
               if (err) reject(err);
               resolve(res);
            });
        });
    }

    addInsult = async (name,sender) => {
        let sql = `INSERT INTO insultes (name,sender) VALUES ?`;
        const values = [name, sender.replace(/[\u0800-\uFFFF]/g, '')]

        const existInsult = await this.getInsult(name);
        if (existInsult) return 'exist';

        return new Promise((resolve, reject) => {
            this.conn.query(sql, [values], (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }

    removeInsult = (id) => {
        let sql = `DELETE FROM insultes WHERE id=${id}`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
}

module.exports = Insult