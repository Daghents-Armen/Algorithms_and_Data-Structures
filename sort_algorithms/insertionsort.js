//Insertion sort - works by dividing the array into a 'sorted' and 
// 'unsorted' part. One by One, 
// elements from the unsorted part are picked and inserted 
// into their correct position in the sorted part.

let arr = [1,7,9,2,10];

for (let i = 1; i < arr.length; ++i) {
    let key = arr[i];
    let j = i - 1;

    while(j >= 0 && arr[j] > key){
        arr[j + 1] = arr[j];
        --j;
    }
    arr[j + 1] = key;
}

console.log(arr);
