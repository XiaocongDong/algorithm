const swap = (arr, i, j) => {
	let temp = arr[j];
	arr[j] = arr[i];
	arr[i] = temp;
}

const generateRandomList = (size, start, end) => {
	let randomList = [];

	for(let i = 0; i < size; i ++) {
		let num = Math.floor(Math.random() * (end - start)) + start;

		randomList.push(num)
	}

	return randomList;
}

const printArr = arr => {
	for(let i of arr) console.log(i);
}

const isSorted = arr => {
	for(let i = 0; i < arr.length - 1; i++) {
		if(arr[i] > arr[i + 1]) return false;
	}

	return true;
}

const testSort = (func, testArr, print=false) => {
	let copy = JSON.parse(JSON.stringify(testArr));

	let start = new Date().valueOf();
	func(copy);
	let end = new Date().valueOf();
	

	const res = isSorted(copy);

	if(res) {
		console.log(`${ func.name }, number ${ testArr.length }: ${ (end - start)/(1000) } s`);
	}else {
		console.log(`test for ${ func.name } failed`);
	}

	print && printArr(copy);
}

const generateArrWithRange = (start, end, interval = 1) => {
	let retArr = [];

	for(let i = start; i <= end; i += interval) {
		retArr.push(i);
	}

	return retArr;
}

module.exports = {
	swap,
	generateRandomList,
	printArr,
	testSort,
	generateArrWithRange
}
