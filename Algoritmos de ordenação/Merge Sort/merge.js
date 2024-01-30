function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const meio = Math.floor(arr.length / 2);
    const esquerda = arr.slice(0, meio);
    const direita = arr.slice(meio);

    return merge(mergeSort(esquerda), mergeSort(direita));
}

function merge(esquerda, direita) {
    let resultado = [];
    let i = 0;
    let j = 0;

    while (i < esquerda.length && j < direita.length) {
        if (esquerda[i] < direita[j]) {
            resultado.push(esquerda[i]);
            i++;
        } else {
            resultado.push(direita[j]);
            j++;
        }
    }

    return resultado.concat(esquerda.slice(i)).concat(direita.slice(j));
}

const arr = [3, 6, 8, 10, 1, 2, 1];
const arrordenado = mergeSort(arr);
console.log("Merge Sort:", arrordenado);