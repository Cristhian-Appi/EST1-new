const {criarDb} = require ("./db")

class DAO {
    db = null 
    constructor (){
        this.db = criarDb ()
    }
    inserirEvento (tipo, minuto, jogador){
    this.db.run ("insert into eventos (tipo, minuto, jogador) values (?,?,?) ", tipo, minuto, jogador)
        }
}

module.exports = {DAO}