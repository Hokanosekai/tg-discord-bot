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
        let sql = `SELECT * FROM insultes WHERE name='${name}'`;
        if (!name) sql = `SELECT * FROM insultes`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                if (!name) resolve(res);
                resolve(res);
            });
        });
    }

    addInsult = async (name,sender) => {
        let sql = `INSERT INTO insultes (name,sender) VALUES ('${name}', '${sender.replace(/[\u0800-\uFFFF]/g, '')}')`;

        const existInsult = await this.getInsult(name);
        if (existInsult.length > 0) return 'exist';

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
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

    getInsultCount = () => {
        let sql = `SELECT COUNT(id) AS c FROM insultes`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res[0].c);
            });
        });
    }

    getRandomInsult = () => {
        let sql = `SELECT * FROM insultes ORDER BY RAND();`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res[0].name);
            });
        });
    }
}

module.exports = Insult