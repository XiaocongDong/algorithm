const Edge = require("./Edge");
// 稀疏有权图，用邻接链表来实现

class WeightedSparseGraph {
    
    constructor(n, directed) {
        this.n = n;
        this.m = 0;
        this.directed = directed;
        this.graph = new Array();
        this.AdjIterator = AdjIterator;

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
    addEdge(v, w, weight) {
        this.graph[v].push(new Edge(v, w, weight));

        if(!this.directed) {
            this.graph[w].push(new Edge(w, v, weight));
        }

        this.m++;
    }

    hasEdge(v, w) {
        for(let i = 0; i < this.graph[v].length; i++) {
            if(this.graph[v][i].other(v) === w) {
                return true;
            }
        }

        return false;
    }

    printGraph() {
        for(let i = 0; i < this.n; i++) {
            let str = `${ i } : `;
            let iterator = new AdjIterator(this, i);

            for(let j = iterator.begin(); !iterator.end(); j = iterator.next()) {
                str += `from ${ j.V() } to ${ j.W() } weight ${ j.Weight() } `
            }

            console.log(str);
        }
    }
}

class AdjIterator {

    // 用于对稀疏图的第v个节点进行遍历，返回所有和稀疏图相邻的点
    constructor(weightedSparseGraph, v) {
        this.weightedSparseGraph = weightedSparseGraph;
        this.v = v;
        this.index = 0; // index 表示当前的索引
    }

    begin() {
        // 开始遍历重置index
        this.index = 0;
        if(this.weightedSparseGraph.graph[this.v].length > 0) {
            return this.weightedSparseGraph.graph[this.v][this.index];
        }

        // 不存在返回null
        return null;
    }

    next() {
        // 返回下一个节点
        for(this.index++; this.index < this.weightedSparseGraph.graph[this.v].length; this.index++) {
            return this.weightedSparseGraph.graph[this.v][this.index];
        }

        return null;
    }

    end() {
        // 返回是否遍历结束
        return this.index >= this.weightedSparseGraph.graph[this.v].length; 
    }
}

module.exports = WeightedSparseGraph;
