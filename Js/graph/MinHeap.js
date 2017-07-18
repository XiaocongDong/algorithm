const { swap } = require("../sort/arrUtil");
// 最小堆每次获取权值最小的边
class MinHeap {

    constructor() {
        this.dataArr = new Array();
    }

    shiftUp(index) {
        while(index > 0) {
            let parent = Math.floor((index - 1) / 2);

            if(this.dataArr[parent].weight > this.dataArr[index].weight) {
                swap(this.dataArr, parent, index);
                index = parent;
            }else {
                break;
            }
        }
    }

    shiftDown(index) {
        while(index * 2 + 1 <= this.dataArr.length - 1) {
            let left = index * 2 + 1;
            let right = index * 2 + 2;
            let k = left;

            if(right <= this.dataArr.length - 1 && this.dataArr[right].weight < this.dataArr[left].weight) {
                k = right;
            }

            if(this.dataArr[k].weight < this.dataArr[index].weight) {
                swap(this.dataArr, k, index);
                index = k;
            }else {
                break;
            }
        }
    }

    extractMin() {
        let min = this.dataArr[0];

        this.dataArr[0] = this.dataArr[this.dataArr.length - 1];
        this.dataArr.pop();

        if(!this.isEmpty()) {
            this.shiftDown(0);
        }

        return min;
    }

    getMin() {
        return this.dataArr[0];
    }

    size() {
        return this.dataArr.length;
    }

    isEmpty() {
        return this.dataArr.length === 0;
    }

    insert(edge) {
        this.dataArr.push(edge);
        this.shiftUp(this.dataArr.length - 1);
    }
}

edges = [
    new Edge(0, 1, 10),
    new Edge(1, 2, 4),
    new Edge(3, 4, 9),
    new Edge(4, 5, 8),
    new Edge(2, 3, 90)
]

module.exports = MinHeap;
