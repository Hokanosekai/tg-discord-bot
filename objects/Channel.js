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


}

module.exports = Channel;