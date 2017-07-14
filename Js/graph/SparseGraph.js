// 稀疏图，用邻接链表来实现
//  0 -> 1 2
//  1 -> 0 1
//  2 -> 1
//  3 -> 4
//  4 -> 3

class SparseGraph {
    
    constructor(n, directed) {
        this.n = n;
        this.m = 0;
        this.directed = directed;
        this.graph = new Array();

        for(let i = 0; i < n; i++) {
            this.graph.push(new Array());
        }
    }

    V() {
        return this.n;
    }

    E() {
        return this.m;
    }

    // 一般来说对于邻接链表不判断是否有平行边，因为太耗费性能了
    addEdge(v, w) {
        this.graph[v].push(w);

        if(this.directed) {
            this.graph[w].push(v);
        }

        this.m ++;
    }

    hasEdge(v, w) {
        for(let i = 0; i < this.graph[v].length; i++) {
            if(this.graph[v][i] === w) {
                return true;
            }
        }

        return false;
    }

    printGraph() {
        for(let i = 0; i < this.n; i++) {
            let str = `${ i } : `;
            let iterator = new SparseGraph.AdjIterator(this, i);

            for(let j = iterator.begin(); !iterator.end(); j = iterator.next()) {
                str += `${ j } `
            }

            console.log(str);
        }
    }
}

class AdjIterator {

    // 用于对稀疏图的第v个节点进行遍历，返回所有和稀疏图相邻的点
    constructor(sparseGraph, v) {
        this.sparseGraph = sparseGraph;
        this.v = v;
        this.index = 0; // index 表示当前的索引
    }

    begin() {
        // 开始遍历重置index
        this.index = 0;
        if(this.sparseGraph.graph[this.v].length > 0) {
            return this.sparseGraph.graph[this.v][this.index];
        }

        // 不存在返回-1
        return -1;
    }

    next() {
        // 返回下一个节点
        for(this.index++; this.index < this.sparseGraph.graph[this.v].length; this.index++) {
            return this.sparseGraph.graph[this.v][this.index];
        }

        return -1;
    }

    end() {
        // 返回是否遍历结束
        return this.index >= this.sparseGraph.graph[this.v].length; 
    }
}

SparseGraph.AdjIterator = AdjIterator;

module.exports = SparseGraph;