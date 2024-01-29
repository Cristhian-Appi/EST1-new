class Banco {
  constructor() {
    this.filaPrioritaria = [];
    this.filaNaoPrioritaria = [];
    this.pilhaPrioritaria = [];
  }

  entrarNaFila(cliente, prioritario = false) {
    if (prioritario) {
      this.filaPrioritaria.push(cliente);
      this.pilhaPrioritaria.push(cliente);
    } else {
      this.filaNaoPrioritaria.push(cliente);
    }

    console.log(`${cliente} entrou na fila ${prioritario ? 'prioritária' : 'não prioritária'}.`);
  }

  atenderCliente() {
    if (this.pilhaPrioritaria.length > 0) {
      const cliente = this.pilhaPrioritaria.pop();
      console.log(`Atendendo cliente prioritário: ${cliente}.`);
    } else if (this.filaNaoPrioritaria.length > 0) {
      const cliente = this.filaNaoPrioritaria.shift();
      console.log(`Atendendo cliente não prioritário: ${cliente}.`);
    } else if (this.filaPrioritaria.length > 0) {
      // Se não há clientes prioritários na pilha, mas ainda há na fila, reabastece a pilha
      this.pilhaPrioritaria = this.filaPrioritaria.reverse();
      this.filaPrioritaria = [];
      return this.atenderCliente();
    } else {
      console.log("Não há clientes aguardando.");
    }
  }
}

// Exemplo de uso
const banco = new Banco();

banco.entrarNaFila("Cliente 1", true); // Cliente prioritário
banco.entrarNaFila("Cliente 2", false); // Cliente não prioritário
banco.entrarNaFila("Cliente 3", true); // Cliente prioritário

banco.atenderCliente(); // Atende cliente prioritário (Cliente 1)
banco.atenderCliente(); // Atende cliente não prioritário (Cliente 2)
banco.atenderCliente(); // Atende cliente prioritário (Cliente 3)
banco.atenderCliente(); // Não há clientes aguardando