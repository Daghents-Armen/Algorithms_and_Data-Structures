// Merge Sort - a divide-and-conquer algorithm that recursively
// splits arrays, sorts subarrays, and merges them. Runs in O(n log n).


let nums = [9,5,7,3,4,6,8];

function merge(nums, low, mid, high){
    let a = nums.slice(low, mid + 1);
    let b = nums.slice(mid + 1, high + 1);

    let i = 0;
    let k = low;
    let j = 0;

    while(i < a.length && j < b.length){
        if(a[i] < b[j]){
            nums[k++] = a[i++];
        } else {
            nums[k++] = b[j++];
        }
    }

    while(i < a.length){
        nums[k++] = a[i++];
    }

    while(j < b.length){
        nums[k++] = b[j++];
    }
}

function mergeSort(nums, low, high){
    if(low >= high) return;

    let mid = Math.floor(low + (high - low) / 2);

    mergeSort(nums, low, mid);
    mergeSort(nums, mid + 1, high);
    merge(nums, low, mid, high);

}

mergeSort(nums, 0, nums.length - 1);


console.log(nums);
