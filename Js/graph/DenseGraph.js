// 稠密图， 用邻接矩阵来表示
// 例如
//      0 1 2 3 4 5
//  0   1 1 1 1 1 1
//  1   0 0 0 1 0 1
//  2   0 1 0 0 1 1
//  3   1 0 0 0 1 1
//  4   1 1 1 1 0 1
//  5   1 0 0 1 0 1
// 1 表示两个点连接在一起

class DenseGraph {

    constructor(n, directed) {
        // n 表示图中点的数量, directed 表示图是否是连通图
        this.n = n;
        this.m = 0; // m 表示图中边的个数
        this.directed = directed; // directed 表示该图是有向还是无向图
        this.graph = new Array();
        // 初始化数组让数组的每一个元素都为0， 表示所有的点都不相连
        for(let i = 0; i < n; i++) {
            this.graph.push(new Array(n).fill(0));
        }
    }

    V() {
        return this.n;
    }

    E() {
        return this.m;
    }

    hasEdge(v, w) {
        // 返回两个点之间是否存在连接
        return this.graph[v][w];
    }

    addEdge(v, w) {
        // 连接图上的两个点
        if(this.hasEdge(v, w)) {
            return;
        }

        this.graph[v][w] = 1;

        if(this.directed) {
            this.graph[w][v] = 1;
        }

        this.m ++;
    }

    printGraph() {
        for(let i = 0; i < this.n; i++) {
            let str = `${ i } : `;
            let iterator = new DenseGraph.AdjIterator(this, i);

            for(let j = iterator.begin(); !iterator.end(); j = iterator.next()) {
                str += `${ j } `
            }

            console.log(str);
        }
    }
}

class AdjIterator {

    // 返回稠密图的, 所有v节点的邻节点
    constructor(denseGraph, v) {
        this.denseGraph = denseGraph;
        this.v = v;
        this.index = -1; // 因为在稠密图中哪个是第一个起点的索引还不知道，所以设为-1
    }

    begin() {
        // 返回开始的节点
        this.index = -1;
        
        return this.next();
    }

    end() {
        return this.index >= this.denseGraph.graph[this.v].length;
    }

    next() {
        for(this.index++; this.index < this.denseGraph.graph[this.v].length; this.index++) {
            if(this.denseGraph.graph[this.v][this.index]) 
                return this.index;
        }

        return -1;
    }
}

DenseGraph.AdjIterator = AdjIterator;

module.exports = DenseGraph;
