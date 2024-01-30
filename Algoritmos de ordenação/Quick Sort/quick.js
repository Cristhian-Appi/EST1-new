function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivo = arr[Math.floor(arr.length / 2)];
    const esquerda = arr.filter(elemento => elemento < pivo);
    const meio = arr.filter(elemento => elemento === pivo);
    const direita = arr.filter(elemento => elemento > pivo);

    return [...quickSort(esquerda), ...meio, ...quickSort(direita)];
}

const arr = [3, 6, 8, 10, 1, 2, 1];
const arrOrdenado = quickSort(arr);
console.log("Quick Sort:", arrOrdenado);