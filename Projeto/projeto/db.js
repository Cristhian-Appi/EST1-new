const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path')

async function criarDb () {
    const db = await open({
        filename: path.resolve('database.db'), 
        driver: sqlite3.Database
    })

    await db.run(`
        CREATE TABLE IF NOT EXISTS eventos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            pontos INTEGER,
            assistencias INTEGER,
            rebotes INTEGER
        )
   `);
   db.on("trace", console.log)
    return db
}

module.exports = {criarDb}
