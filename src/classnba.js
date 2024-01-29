const {DAO} = require ("./dao")

const dao = new DAO()

// Definindo a classe Node para representar um nó na lista encadeada de eventos
class Nodo {
    constructor(jogador, tipo_evento, tempo) {
        this.jogador = jogador;
        this.tipo_evento = tipo_evento;
        this.tempo = tempo;
        this.proximo = null;
    }
}

// Definindo a classe ListaEventos para representar uma lista encadeada de eventos
class ListaEventos { 
    constructor() {
        this.inicio = null;
    }

    // Método para adicionar um novo evento à lista
    adicionarEvento(jogador, tipo_evento, tempo) {
        const novoEvento = new Nodo(jogador, tipo_evento, tempo);
        dao.inserirEvento (tipo_evento, tempo, jogador)

        if (!this.inicio) {
            this.inicio = novoEvento;
        } else {
            let atual = this.inicio;
            while (atual.proximo) {
                atual = atual.proximo;
            }
            atual.proximo = novoEvento;
        }
    }

    // Método para exibir todos os eventos da lista
    exibirEventos() {
        let atual = this.inicio;
        while (atual) {
            console.log(`${atual.jogador} - ${atual.tipo_evento} aos ${atual.tempo} minutos`);
            atual = atual.proximo;
        }
    }
}

// Definindo a classe FilaSubstituicoes para representar uma fila de substituições
class FilaSubstituicoes {
    constructor() {
        this.fila = [];
    }

    // Método para enfileirar uma substituição
    enfileirarSubstituicao(jogadorEntrando, jogadorSaindo) {
        this.fila.push({ jogadorEntrando, jogadorSaindo });
    }

    // Método para processar todas as substituições na fila
    processarSubstituicoes() {
        while (this.fila.length > 0) {
            const { jogadorEntrando, jogadorSaindo } = this.fila.shift();
            console.log(`Substituição: ${jogadorEntrando} entra, ${jogadorSaindo} sai`);
        }
    }
}

// Definindo a classe PilhaEstatisticas para representar uma pilha de estatísticas
class PilhaEstatisticas {
    constructor() {
        this.pilha = [];
    }

    // Método para adicionar uma nova estatística à pilha
    adicionarEstatistica(jogador, tipoEstatistica) {
        this.pilha.push({ jogador, tipoEstatistica });
    }

    // Método para desfazer a última estatística adicionada à pilha
    desfazerUltimaEstatistica() {
        if (this.pilha.length > 0) {
            const { jogador, tipoEstatistica } = this.pilha.pop();
            console.log(`Desfazer última estatística: ${jogador} - ${tipoEstatistica}`);
        }
    }
}

// Exemplo de uso:
const listaEventos = new ListaEventos();
const filaSubstituicoes = new FilaSubstituicoes();
const pilhaEstatisticas = new PilhaEstatisticas();

// Adicionando eventos à lista
listaEventos.adicionarEvento("JogadorA", "Arremesso de 2 pontos", 5);
listaEventos.adicionarEvento("JogadorB", "Falta", 7);
listaEventos.adicionarEvento("JogadorA", "Assistência", 8);

// Adicionando substituições à fila
filaSubstituicoes.enfileirarSubstituicao("JogadorC", "JogadorA");
filaSubstituicoes.enfileirarSubstituicao("JogadorD", "JogadorB");

// Processando substituições
filaSubstituicoes.processarSubstituicoes();

// Adicionando estatísticas à pilha
pilhaEstatisticas.adicionarEstatistica("JogadorA", "Pontos Marcados: 2");
pilhaEstatisticas.adicionarEstatistica("JogadorB", "Assistência");

// Desfazendo última estatística
pilhaEstatisticas.desfazerUltimaEstatistica();

// Exibindo eventos, substituições e estatísticas
console.log("\nEventos:");
listaEventos.exibirEventos();
