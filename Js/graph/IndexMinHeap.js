const { swap } = require("../sort/arrUtil");
// 最小索引堆, 里面一共维护三个数组
// data 数组用于储存数据，这个数组里面的数据不会被删除，
// indexes 数组用于存储data数据的索引，indexes数据就是整个数据结构真正的堆，
//      在这个数组里面每一个位置映射着堆得一个位置，这个位置存储的数据为该位置对应的数据在data数组里面的索引
// reverse 数组，又称为反向数组，因为现在可以根据indexes数组里面存储的索引很容易找到data的数据当时如果给你一个
//      数据的索引要对indexes数据进行遍历一遍才知道其在indexes数组里面对应的位置，很耗时，所以可以建立这个反向数组

class IndexMinHeap {

    constructor(capacity) {
        // capacity 表示该最小索引堆最多可以容纳多少个元素
        // 不能超过这个capacity的大小
        this.capacity = capacity;
        // count 表示现在索引最小堆里面有效元素的个数
        this.count = 0;
        // 因为索引由1开始，所以数组长度为capacity + 1
        this.datas = new Array(capacity + 1);
        this.indexes = new Array(capacity + 1);
        this.reverse = new Array(capacity + 1);

        // 初始化indexes和reverse两个数组
        for(let i = 0; i < this.indexes.length; i++) {
            // 0 表示该索引什么数据也不指向，因为原来数组里面一个数据也没有
            this.indexes[i] = 0;
            this.reverse[i] = 0;
        }
    }

    insert(index, edge) {
        // 在data的第几个位置插入一个新的数据, 这里是边
        if(this.count + 1 > this.capacity) {
            throw new Error("index min heap is overflow");
        }

        // 注意在堆中为了好实现，从1开始作为数组的起点，这点对API的调用者进行屏蔽
        // 所以对于三个数组的操作都要讲索引值进行加一操作
        index += 1;
        this.datas[index] = edge;
        this.indexes[this.count + 1] = index;
        this.reverse[index] = this.count + 1;
        this.count++;
        this.shiftUp(this.count);
    }

    shiftUp(index) {
        // 表示从索引堆的第几个元素进行shift up操作
        while(index > 1 
                && 
              this.datas[this.indexes[Math.floor(index/2)]].weight > this.datas[this.indexes[index]].weight
        ) {
            let parent = Math.floor(index/2);
            swap(this.indexes, parent, index);
            this.reverse[this.indexes[parent]] = parent;
            this.reverse[this.indexes[index]] = index;
            index = parent;
        }
    }

    shiftDown(index) {
        // 表示从索引堆得第几个元素进行shift down操作
        while( 2 * index <= this.count) {
            let left = 2 * index;
            let k = left

            if(left + 1 <= this.count 
                && this.datas[this.indexes[left + 1]].weight < this.datas[this.indexes[left]].weight) {
                k = left + 1;
            }

            if(this.datas[this.indexes[index]].weight > this.datas[this.indexes[k]].weight) {
                swap(this.indexes, index, k);
                this.reverse[this.indexes[index]] = index;
                this.reverse[this.indexes[k]] = k;
            }else {
                break;
            }
        }
    }

    extractMin() {
        // 获取最小的数据， 并把最小的数据删除掉
        if(this.count === 0) 
            return undefined;

        let ret = this.datas[this.indexes[1]];
        this.indexes[1] = this.indexes[this.count];
        // 将最后一个索引指向0， 表示该索引指向无效数据
        this.indexes[this.count] = 0;
        this.reverse[this.indexes[1]] = 1;
        
        this.count--;

        if(this.count === 0) {
            return ret;
        }

        this.shiftDown(1);
        return ret;
    }

    extractMinIndex() {
        // 获取最小的索引, 并把最小的数据删除掉
        if(this.count === 0) 
            return undefined;
        
        let ret = this.indexes[1] - 1;

        this.indexes[1] = this.indexes[this.count];
        this.indexes[this.count] = 0;
        this.count--;

        if(this.count === 0) 
            return ret;

        this.shiftDown(1);
        return ret;
    }

    getMin() {
        // 获取最小的数据, 不删除数据
        if(this.count === 0) 
            return undefined;

        return this.datas[this.indexes[1]];
    }

    getMinIndex() {
        // 获取最小索引，不删除数据
        if(this.count === 0) 
            return undefined;
        
        return this.indexes[1] - 1;
    }

    isEmpty() {
        // 判断最小索引堆是不是为空
        return this.count === 0;
    }

    size() {
        // 获取最小索引堆的大小
        return this.count;
    }

    contain(index) {
        // 获取当前的索引堆是否还包含索引为index的元素，或者说该元素是否还有效
        return this.indexes[this.reverse[index + 1]] !== 0;
    } 

    getItem(index) {
        return this.datas[index + 1];
    }
    
    update(index, data) {
        // 更新某个位置的元素
        if(!this.contain(index)) {
            console.log("doesn't contain ", index)
            this.insert(index, data);
        }else {
            index++;
            this.datas[index] = data;
            this.shiftDown(this.reverse[index]);
            this.shiftUp(this.reverse[index]);
        }
    }
}

let indexMinHeap = new IndexMinHeap(10);

indexMinHeap.insert(0, {weight: 10});
indexMinHeap.insert(1, {weight: 20});
indexMinHeap.insert(9, {weight: 5});
indexMinHeap.insert(7, {weight: 40});
// indexMinHeap.update(1, {weight: 1});
// console.log(indexMinHeap.datas);
// console.log(indexMinHeap.indexes);
// console.log(indexMinHeap.reverse);


// while(!indexMinHeap.isEmpty()) {
//     console.log(indexMinHeap.extractMin());
// }

// console.log(indexMinHeap.contain(9));
// console.log(indexMinHeap.contain(0));
// console.log(indexMinHeap.contain(1));
// console.log(indexMinHeap.contain(7));
// console.log(indexMinHeap.contain(5));
// console.log(indexMinHeap.getItem(9));

module.exports = IndexMinHeap;