// backend/utils/db.js
const sqlite3 = require('sqlite3').verbose(); // Corrected from 'sqlite' to 'sqlite3'
const path = require('path');

const DBSOURCE = path.join(__dirname, '../db.sqlite');

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        throw err;
    }
});

// Promisify the db methods for async/await
const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

module.exports = {
    query,
    run
};
