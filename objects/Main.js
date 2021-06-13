/*
 * Copyright (c) 2021.
 * by Hokanosekai
 */

class Main {
    conn

    id
    count

    constructor(db) {
        this.conn = db;
    }

    getCount = () => {
        let sql = `SELECT count FROM main WHERE id=1`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res[0].count);
            });
        });
    }

    addOne = async () => {
        this.count = await this.getCount() + 1;
        let sql = `UPDATE main SET count = ${this.count} WHERE id = 1;`;

        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
}

module.exports = Main;