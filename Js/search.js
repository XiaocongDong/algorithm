// 非递归
const binarySearch = (arr, target) => {
    let start = 0, end = arr.length - 1;

    // 一定要搞清楚变量的具体含义边界条件
    // 二分查找将在 arr[left, right] 左闭右闭的范围下查找
    while(end >= start) {

        let mid = Math.floor((end + start) / 2);

        if(arr[mid] == target) return mid;
        else if(arr[mid] < target) start = mid + 1;
        else end = mid - 1;
    }

    return -1;
}

// 递归实现
const binarySearchIte = (arr, start, end, target) => {
    if(start > end) return -1;

    let mid = Math.floor((start + end) / 2);

    if(arr[mid] === target) return mid;
    else if(arr[mid] < target) start = mid + 1;
    else end = mid - 1;

    return binarySearchIte(arr, start, end, target); 
}

let orderedList = [1, 2, 3, 4, 5];

let target = 3;

let index = binarySearch(orderedList, target);
let indexIte = binarySearchIte(orderedList, 0, orderedList.length - 1, target);
console.log(index, indexIte);