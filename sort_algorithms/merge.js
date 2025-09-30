let nums1 = [1,5,7,11];
let nums2 = [2,4,8,10];
let nums3 = [3,6,9,12];

let i = 0;
let j = 0;
let k = 0;
let newarr = [];
while(i < nums1.length && j < nums2.length && k < nums3.length){
    if(nums1[i] <= nums2[j] && nums1[i] <= nums3[k]){
        newarr.push(nums1[i++]);
    } else if(nums2[j] <= nums1[i] && nums2[j] <= nums3[k]){
        newarr.push(nums2[j++]);
    } else {
        newarr.push(nums3[k++]);
    }
}

      while(i < nums1.length && j < nums2.length){
        if(nums1[i] <= nums2[j]){
           newarr.push(nums1[i++]); 
        } else {
            newarr.push(nums2[j++]);
        }
    }

     while(j < nums2.length && k < nums3.length){
        if(nums2[j] <= nums3[k]){
            newarr.push(nums2[j++]);
        } else {
            newarr.push(nums3[k++])
        }
    }

    while(k < nums3.length && i < nums1.length){
        if(nums3[k] <= nums1[i]){
            newarr.push(nums3[k++]);
        } else {
            newarr.push(nums1[i++]);
        }
    }

    while(i < nums1.length){
        newarr.push(nums1[i++]);
    }

    while(j < nums2.length){
        newarr.push(nums2[j++]);
    }

    while(k < nums3.length){
        newarr.push(nums3[k++]);
    }

console.log(newarr);
