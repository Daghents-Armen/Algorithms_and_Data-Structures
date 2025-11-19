// Quick Sort - an in-place divide-and-conquer sorting algorithm
// that selects a pivot, partitions the array around it, and
// recursively sorts partitions. Average O(n log n) time.


let arr = [7,3,9,4,6,3,2];

const swap = (arr, left, right) => {
    [arr[left], arr[right]] = [arr[right], arr[left]];
}

const partition = (arr, low, high) => {
    let i = low - 1;
    let j = high;
    let pivot = arr[high];

    while(i < j){
        do {
            ++i;
        } while(pivot >= arr[i] && i < high);

        do{
            --j;
        } while(pivot < arr[j] && j > low);

        if(i < j){
            swap(arr, i, j);
        }
    }
    swap(arr, j, low);
    return j;
}

const quicksort = (arr, low, high) => {
    if(low < high){
        const pi = partition(arr, low, high);
        quicksort(arr, low, pi);
        quicksort(arr, pi + 1, high);
    }
}

quicksort(arr, 0, arr.length);