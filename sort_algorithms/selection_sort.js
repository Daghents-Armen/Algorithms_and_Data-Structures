//  Selection Sort - works by repeatedly finding the minimum element 
// from the unsorted part and placing it at the beginning of the array.

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
