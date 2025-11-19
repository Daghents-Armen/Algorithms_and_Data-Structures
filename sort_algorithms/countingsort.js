// Counting Sort - a non-comparison-based sorting algorithm that
// counts the occurrences of each element and uses this information
// to place elements in sorted order. Efficient for small integer ranges.

function countingSort(arr){
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    let count = new Array(range).fill(0);
    let output = new Array(arr.length).fill(0);

    for (let num of arr){
        count[num - min]++;
    }

    for(let i = 1; i < range; ++i){
        count[i] = count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; --i){
        let num = arr[i];
        output[count[num - min] - 1] = arr[i];
        count[num - min]--;
    }
}

