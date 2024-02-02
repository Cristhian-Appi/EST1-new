const { criarDb } = require("./db")

class DAO {
    db = null

    constructor(db) {
        this.db = db
    }

    async inserirEvento(nome, pontos, assistencias, rebotes) {
        console.log(nome)
        const db = await criarDb()
        await db.run("insert into eventos (nome, pontos, assistencias, rebotes) values (?, ?, ?, ?)", nome, pontos, assistencias, rebotes)
        console.log(await this.listarEventos())
    }

    async listarEventos() {
        const eventos = await this.db.all('select * from eventos')

        return eventos
    }
}

module.exports = { DAO }