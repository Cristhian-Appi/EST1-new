const sqlite3 = require('sqlite3').verbose();

function criarDb () {
    
    const db = new sqlite3.Database('./meu_banco_de_dados.db');

    // Tabela Eventos
         
    db.run(`
    CREATE TABLE IF NOT EXISTS eventos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT NOT NULL,
        minuto INTEGER,
        jogador TEXT
    )
    `);

    return db
}

module.exports = {criarDb}
