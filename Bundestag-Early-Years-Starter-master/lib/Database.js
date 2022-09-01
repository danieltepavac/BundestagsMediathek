import sqlite3 from 'sqlite3';
import Logger from './Logger.js';

function openDatabaseFrom(path) {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (error) => {
            if (error === null) {
                Logger.log(`Database (${path}) opened`);
                resolve(db);
            } else {
                Logger.log(`Database (${path}) could not be opened`);
                reject(new Error(`Error while opening database (${path})`));
            }
        });
    });
}

class QueryResult {

    constructor(query, rows) {
        this.query = query;
        this.resultSet = rows;
        this.createdAt = Date.now();
        Object.freeze(this);
    }

}

class Database {

    #db;

    async open(path = "database.sqlite") {
        this.#db = await openDatabaseFrom(path);
        return;
    }

    async runQuery(query) {
        return new Promise((resolve, reject) => {
            if (this.#db === undefined) {
                reject(new Error("Database not ready"));
            }
            this.#db.all(query.query, (error, rows) => {
                if (error === null) {
                    Logger.log(`Query (${query.query}) run successfully`);
                    resolve(new QueryResult(query.query, rows));
                } else {
                    Logger.log(`Error while running query (${query.query})`);
                    reject(new Error(`Error while running query (${query.query})`));
                }
            });
        });
    }

}

export default new Database();