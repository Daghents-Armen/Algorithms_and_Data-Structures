let arr = [5,8,3,12,10,2,2];

for (let i = 0; i < arr.length - 1; ++i) {
    let min = 0;
    let index = i;
    let swapped = 0;
    for (let j = i + 1; j < arr.length; ++j) {
        if(arr[index] > arr[j]){
            min = arr[j]
            index = j;
            swapped = 1;
        }
    }
    if(swapped){
    let tmp = arr[i];
    arr[i] = min;
    arr[index] = tmp;
}
}
console.log(arr);


// more optimal way

let nums = [5,2,7,5,9,2,5,3,7,4];

for (let i = 0; i < nums.length - 1; ++i) {
    let index2 = i;
    for (let j = i + 1; j < nums.length; ++j) {
        if(nums[index2] > nums[j]){
            index2 = j;
        }
    }
    if(index2 !== i){
    [nums[i], nums[index2]] = [nums[index2], nums[i]];
    }
}

console.log(nums);
