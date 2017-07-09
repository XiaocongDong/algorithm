const { swap, generateRandomList, printArr, testSort } = require('./arrUtil');

const selectionSort = (arr) => {
	for(let i = 0; i <= arr.length - 2; i++) {
		let minIndex = i;

		for(let j = i + 1; j <= arr.length - 1; j++) {
			if(arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}

		(minIndex !== i) && (swap(arr, minIndex, i));
	}
}

const insertionSort = arr => {

	for(let i = 1; i < arr.length; i++) {
		finalPos = i;
		ele = arr[i];

		for(let j = i - 1; j >= 0; j--) {
			if(ele < arr[j]) {
				arr[finalPos] = arr[j];
				finalPos = j;
			}else {
				break;
			}
		}

		if(finalPos !== i) {
			arr[finalPos] = ele;
 		}
	}
}

const mergeSort = arr => {
	let start = 0, end = arr.length - 1;
	auxArr = [];
	__mergeSort(arr, start, end, auxArr);
}

const __mergeSort = (arr, start, end, auxArr) => {
	// console.log(start, end);
	if(end - start <= 0) return;

	let middle = Math.floor((start + end) / 2);

	__mergeSort(arr, start, middle, auxArr);
	__mergeSort(arr, middle + 1, end, auxArr);

	let i = start, j = middle + 1, k = i;

	if(arr[middle] <= arr[middle + 1]) return;

	while(i <= middle && j <= end) {
		if(arr[i] < arr[j]) {
			auxArr[k] = arr[i];
			i++;
		}else {
			auxArr[k] = arr[j];
			i++;
		}

		k++;
	}

	while(i <= middle) {
		auxArr[k] = arr[i];
		i++; k++;
	}

	while(j <= end) {
		auxArr[k] = arr[j];
		j++; k++;
	}

	for(let n = start; n <= end; n++) {
		arr[n] = auxArr[n]
	}
}

const quickSort = arr => {
	let start = 0, end = arr.length - 1;

	__quickSort(arr, start, end);
}

const __quickSort = (arr, start, end) => {
	if(end - start <= 0) return;
	
	let p = partition1(arr, start, end);
	
	swap(arr, p, start);

	__quickSort(arr, start, p - 1);
	__quickSort(arr, p + 1, end);
}

const partition1 = (arr, start, end) => {
	let curr = start, ele = arr[curr], i = start;

	for(let j = start + 1; j <= end; j++) {
		if(arr[j] < ele) {
			if(j - i > 1) {
				swap(arr, i + 1, j);
			}

			i++;
		}
	}

	return i;
}

// nearly ordered case
const partition2 = (arr, start, end) => {
	let curr = Math.floor(Math.random() * (end - start)) + start;

	swap(arr, curr, start);

	return partition1(arr, start, end);
}

const quickSortIn3Way = arr => {
	if(arr.length <= 1) return;
	partionIn3Way(arr, 0, arr.length - 1);
}

const partionIn3Way = (arr, start, end) => {
	if(end <= start) return;

	let curr = Math.floor(Math.random() * (end - start)) + start;

	swap(arr, curr, start);

	// arr[start, lt] < pivot, arr[lt + 1, i) == pivot, arr[gt, end] > pivot
	let p = arr[start], lt = start, i = start + 1, gt = end + 1;

	while(i < gt) {
		if(arr[i] < p) {
			swap(arr, lt + 1, i);
			lt++;
			i++;
		}
		else if(arr[i] > p) {
			swap(arr, gt - 1, i);
			gt--;
		}
		else {
			i++;
		}
	}

	swap(arr, lt, start);
	partionIn3Way(arr, start, lt - 1);
	partionIn3Way(arr, gt, end);
}

let testList = generateRandomList(1000000, 1, 100000);
// selectionSort(testList);
testSort(quickSortIn3Way, testList);
testSort(quickSort, testList);
// testSort(mergeSort, testList);
// testSort(selectionSort, testList);
// testSort(insertionSort, testList);
//printArr(testList)