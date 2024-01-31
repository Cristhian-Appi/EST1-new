class HashLista {
    constructor(chave) {
        this.chave = chave;
        this.prox = null;
    }
}

const TAMANHO_VETOR = 10;
const tabela = new Array(TAMANHO_VETOR);

for (let i = 0; i < TAMANHO_VETOR; i++) {
    tabela[i] = null;
}

function FuncaoHashing(num) {
    return num % TAMANHO_VETOR;
}

function InserirNaHash(tabela, pos, num) {
    const novoRegistro = new HashLista(num);
    if (!tabela[pos]) {
        tabela[pos] = novoRegistro;
    } else {
        let atual = tabela[pos];
        while (atual.prox) {
            atual = atual.prox;
        }
        atual.prox = novoRegistro;
    }
}

function RemoverDaHash(tabela, num) {
    const pos = FuncaoHashing(num);
    let atual = tabela[pos];
    let anterior = null;

    while (atual && atual.chave !== num) {
        anterior = atual;
        atual = atual.prox;
    }

    if (atual) {
        if (anterior) {
            anterior.prox = atual.prox;
        } else {
            tabela[pos] = atual.prox;
        }
    }
}

function executarHashLista() {
    let op, pos, num;

    do {
        console.log("1. Inserir na Hash");
        console.log("2. Remover da Hash");
        console.log("0. Sair");
        op = parseInt(prompt("Escolha uma opção:"));

        switch (op) {
            case 1:
                num = parseInt(prompt("Digite o número a ser inserido:"));
                pos = FuncaoHashing(num);
                InserirNaHash(tabela, pos, num);
                break;
            case 2:
                num = parseInt(prompt("Digite o número a ser removido:"));
                RemoverDaHash(tabela, num);
                break;
            case 0:
                console.log("Saindo do programa.");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } while (op !== 0);
}

executarHashLista();