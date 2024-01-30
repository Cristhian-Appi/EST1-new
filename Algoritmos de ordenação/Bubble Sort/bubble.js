function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

const arr = [3, 6, 8, 10, 1, 2, 1];
bubbleSort(arr);
console.log("Bubble Sort:", arr);