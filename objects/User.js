/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

class User {
    conn

    id
    discord_id
    name
    nb_message
    points
    level

    constructor(db) {
        this.conn = db;
    }

    addUser = async (discord_id, name) => {
        let sql = `INSERT INTO users (id_users,name) VALUES ('${discord_id}','${name.replace(/[\u0800-\uFFFF]/g, '')}');`;

        const existUser = await this.getUser(discord_id);
        if (existUser) return 'exist';

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }

    removeUser = (id) => {
        let sql = `DELETE FROM users WHERE id=${id};`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }

    getUser = (discord_id = undefined) => {
        let sql = `SELECT * FROM users WHERE id_users=${discord_id};`;
        if (!discord_id)  sql = `SELECT * FROM users`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                if (!discord_id) resolve(res);
                resolve(res[0]);
            });
        });
    }

    updateLevel = (nb_message, points, lvl, discord_id) => {
        let sql = `UPDATE users SET nb_message = ${nb_message}, points = ${points}, level = ${lvl} WHERE id_users = ${discord_id};`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                if (!discord_id) resolve(res);
                resolve(res);
            });
        });
    }
}

module.exports = User