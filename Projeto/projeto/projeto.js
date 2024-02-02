const readlineSync = require('readline-sync');
const {DAO} = require("./dao"); 
const { criarDb } = require('./db'); 
const fs = require("node:fs");

class Jogador { 
    constructor(nome, pontos, rebotes, assistencias) {
        this.nome = nome;
        this.pontos = pontos;
        this.rebotes = rebotes;
        this.assistencias = assistencias;
        this.esquerda = null;
        this.direita = null;
    }
}

class ArvoreBinariaBuscaJogadores {
    constructor(log) {
        this.log = log;
        this.raiz = null;
    }

     inserirJogadorManualmente() {
        const nome = readlineSync.question('Digite o nome do jogador: ');
        const pontos = parseInt(readlineSync.question('Digite a pontuação do jogador: '));
        const rebotes = parseInt(readlineSync.question('Digite o número de rebotes do jogador: '));
        const assistencias = parseInt(readlineSync.question('Digite o número de assistências do jogador: '));

        const novoJogador = new Jogador(nome, pontos, rebotes, assistencias);
        this.log.inserirEvento(nome, pontos, assistencias, rebotes)

        this.raiz = this.inserir(this.raiz,novoJogador);

        console.log(`Jogador ${nome} inserido na árvore.`);
        
    }

    inserir(noAtual, jogador) {
        if (!noAtual) {
            return jogador;
        }

        if (jogador.nome.localeCompare(noAtual.nome) < 0) {
            noAtual.esquerda = this.inserir(noAtual.esquerda, jogador);
        } else if (jogador.nome.localeCompare(noAtual.nome) > 0) {
            noAtual.direita = this.inserir(noAtual.direita, jogador);
        }

        return noAtual;
    }

    _bucarPorEstatistica(noAtual, resultado, estatistica, valor) { 
        if (noAtual) {
            this._bucarPorEstatistica(noAtual.esquerda, resultado, estatistica, valor);
            if (noAtual[estatistica] == valor) {
                resultado.push({
                    nome: noAtual.nome,
                    pontos: noAtual.pontos,
                    rebotes: noAtual.rebotes,
                    assistencias: noAtual.assistencias,
                });
            }
            
            this._bucarPorEstatistica(noAtual.direita, resultado, estatistica, valor);
        }
    }

    bucarPorEstatistica(){ 
        const estatistica = readlineSync.question('Digite o nome da estatistica (pontos, rebotes, assistencias): ');
        const valor = parseInt(readlineSync.question('Digite o valor: '));
        const resultado = []
        this._bucarPorEstatistica(this.raiz, resultado, estatistica, valor)
        console.log(resultado);
    }

    buscarJogadorManualmente() { 
        const nomeBusca = readlineSync.question('Digite o nome do jogador a ser buscado: ');
        const jogadorEncontrado = this.buscar(this.raiz, nomeBusca);

        if (jogadorEncontrado) {
            console.log("Jogador encontrado:", jogadorEncontrado);
        } else {
            console.log('Jogador não encontrado');
        }
    }

    buscar(noAtual, nome) { 
        if (!noAtual || noAtual.nome === nome) {
            return noAtual;
        }

        if (nome.localeCompare(noAtual.nome) < 0) {
            return this.buscar(noAtual.esquerda, nome);
        }

        return this.buscar(noAtual.direita, nome);
    }

    removerJogadorManualmente() { 
        const nomeRemocao = readlineSync.question('Digite o nome do jogador a ser removido: ');
        this.raiz = this.remover(this.raiz, nomeRemocao);
        console.log(`Jogador com nome ${nomeRemocao} removido da árvore.`);
    }

    remover(noAtual, nome) { 
        if (!noAtual) {
            return noAtual;
        }

        if (nome.localeCompare(noAtual.nome) < 0) {
            noAtual.esquerda = this.remover(noAtual.esquerda, nome);
        } else if (nome.localeCompare(noAtual.nome) > 0) {
            noAtual.direita = this.remover(noAtual.direita, nome);
        } else {
            if (noAtual.esquerda === null) {
                return noAtual.direita;
            } else if (noAtual.direita === null) {
                return noAtual.esquerda;
            }
            noAtual.nome = this.minValorNo(noAtual.direita).nome;
            noAtual.direita = this.remover(noAtual.direita, noAtual.nome);
        }

        return noAtual;
    }

    minValorNo(no) { 
        let atual = no;
        while (atual.esquerda !== null) {
            atual = atual.esquerda;
        }
        return atual;
    }

    listarJogadoresEmOrdem() {
        const jogadoresEmOrdem = this.percorrerEmOrdem();
        console.log('Listagem de jogadores em ordem alfabética:');
        jogadoresEmOrdem.forEach(jogador => console.log(jogador));
    }

    percorrerEmOrdem() {
        const resultado = [];
        this._percorrerEmOrdem(this.raiz, resultado);
        return resultado;
    }

    _percorrerEmOrdem(noAtual, resultado) { 
        if (noAtual) {
            this._percorrerEmOrdem(noAtual.esquerda, resultado);
            resultado.push({
                nome: noAtual.nome,
                pontos: noAtual.pontos,
                rebotes: noAtual.rebotes,
                assistencias: noAtual.assistencias,
            });
            this._percorrerEmOrdem(noAtual.direita, resultado);
        }
    }

    iniciarInteracao() {
        while (true) {
            console.log('\nEscolha uma opção:');
            console.log('1. Inserir jogador');
            console.log('2. Buscar jogador');
            console.log('3. Buscar por estatistica');
            console.log('4. Remover jogador');
            console.log('5. Listar jogadores em ordem alfabética');
            console.log('6. Sair');

            const opcao = parseInt(readlineSync.question('> '));

            switch (opcao) {
                case 1:
                    this.inserirJogadorManualmente();
                    break;
                case 2:
                    this.buscarJogadorManualmente();
                    break;
                case 3:
                    this.bucarPorEstatistica();
                    break;
                case 4:
                    this.removerJogadorManualmente();
                    break;
                case 5:
                    this.listarJogadoresEmOrdem();
                    break;
                case 6:
                    console.log("Programa encerrado.");
                    process.exit();
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }
}
async function main(){
    // const db = await criarDb()
    // const dao = new DAO(db)
    const log = {
        inserirEvento: (...data)=> {
            fs.appendFileSync("log.txt", data.join(",")+"\n")
        }
    }
    
    const abbJogadores = new ArvoreBinariaBuscaJogadores(log);
    abbJogadores.iniciarInteracao();
}

main()