let arr = [4,2,6,4,7,6,8];

for(let i = 0; i < arr.length - 1; ++i) {
    let swapped = 0;
    for (let j = 0; j < arr.length - 1 - i; ++j){
        if(arr[j] > arr[j + 1]){
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swapped = 1;
        }
    }
    if(!swapped) break;
}

console.log(arr);
