const objUtil = require('./objUtil');
const arrUtil = require('./arrUtil');

// 索引堆
let MaxHeap = function(arr) {
    this.indexArr = arrUtil.generateArrWithRange(0, arr.length - 1);
    this.dataArr = objUtil.clone(arr);
    this.size = this.dataArr.length;
    this.heapify();
}

MaxHeap.prototype.printHeap =function() {
    for(let i of this.indexArr) {
        console.log(this.dataArr[i]);
    }
}

MaxHeap.prototype.heapify = function() {
    let start = Math.floor((this.size - 2) / 2);

    for(let i = start; i >= 0; i--) {
        this.shiftDown(i);
    }
}

MaxHeap.prototype.shiftDown = function(start) {
    let i = start;
    let end = this.size - 1;

    //仍存在左节点再比较
    while(2 * i + 1 <= end) {
        let left = 2 * i + 1, right = 2 * i + 2;
        let k = left;

        if(right <= end 
           && this.dataArr[this.indexArr[right]] > this.dataArr[this.indexArr[left]]) {
               k = right;
           }

        if(this.dataArr[this.indexArr[i]] < this.dataArr[this.indexArr[k]] ) {
            // console.log(`swapping ${ i } and ${ k }`)
            arrUtil.swap(this.indexArr, i, k);
            i = k;
        }
        else break;
    } 
}

MaxHeap.prototype.shiftUp = function(i) {
    let index = i;

    while(index > 0) {
        let e = this.dataArr[this.indexArr[index]]
        let parentIndex = Math.floor((index - 1)/2);
        let parent = this.dataArr[this.indexArr[parentIndex]];

        if(parent < e) {
            arrUtil.swap(this.indexArr, index, parentIndex);
            parentIndex = index;
        }else {
            break;
        }
    }
}

MaxHeap.prototype.pop = function() {
    // 当前方法，从堆中获取元素时，只是把索引没有对原来数组进行操作
    if(this.size === 0) return;

    let ret = this.dataArr[this.indexArr[0]];

    this.indexArr[0] = this.indexArr.pop()

    this.shiftDown(0);
    this.size --;

    return ret;
}

// 把数组的第 i 个元素的值改一下
MaxHeap.prototype.change = function(i, d) {

    this.dataArr[i] = d;

    //根据索引值找到在索引数组里面对应的索引在哪
    let index;

    for(let j in this.indexArr) {
        if(this.indexArr[j] === i) {
            index = j;
            break;
        }
    }
    this.shiftUp(index);
    this.shiftDown(index);
}

MaxHeap.prototype.isEmpty = function() {
    return this.size == 0;
}

let testList = arrUtil.generateRandomList(10, 1, 10);
let maxHeap = new MaxHeap(testList);

// while(!maxHeap.isEmpty()) {
//     let e = maxHeap.pop();

//     console.log(e);
// }

maxHeap.printHeap();

maxHeap.change(1, 100);
console.log('seperate')
maxHeap.printHeap();
