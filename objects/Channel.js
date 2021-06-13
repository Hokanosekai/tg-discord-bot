/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

class Channel {
    conn

    id
    name
    discord_id

    constructor(db) {
        this.conn = db;
    }

    addChannel = async (name, discord_id) => {
        let sql = `INSERT INTO channels (channel_id,name) VALUES ('${discord_id}','${name.replace(/[\u0800-\uFFFF]/g, '')}')`;

        const existChannel = await this.getChannel(discord_id);
        if (existChannel) return 'exist';

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }

    getChannel = (discord_id = undefined) => {
        let sql = `SELECT * FROM channels WHERE channel_id=${discord_id};`;
        if (!discord_id)  sql = `SELECT * FROM channels`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                if (!discord_id) resolve(res);
                resolve(res[0]);
            });
        });
    }

    removeChannel = (id) => {
        let sql = `DELETE FROM channels WHERE id=${id};`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
}

module.exports = Channel;