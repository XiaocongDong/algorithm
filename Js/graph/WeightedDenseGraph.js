const Edge = require("./Edge");

// 带权稠密图，因临接矩阵来表示，如果v, w右边则this.graph[v][w] = edge,or this.graph[v][w] = null
class WeightedDenseGraph {

    constructor(n, directed) {
        // n 表示图中点的数量, directed 表示图是否是连通图
        this.n = n;
        this.m = 0; // m 表示图中边的个数
        this.directed = directed; // directed 表示该图是有向还是无向图
        this.graph = new Array();
        this.AdjIterator = AdjIterator;
        // 初始化数组让数组的每一个元素都为null， 表示所有的点都不相连
        for(let i = 0; i < n; i++) {
            this.graph.push(new Array(n).fill(null));
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
        return this.graph[v][w] !== null;
    }

    addEdge(v, w, weight) {
        // 连接图上的两个点
        // 如果图上两个点已经连接， 则更新边的信息
        if(this.hasEdge(v, w)) {
            // 删除原来的边
            this.graph[v][w] = null;
            if(!this.directed) {
                this.graph[w][v] = null;
            }
        }

        this.graph[v][w] = new Edge(v, w, weight);

        if(!this.directed) {
            this.graph[w][v] = new Edge(w, v, weight);
        }

        this.m ++;
    }

    printGraph() {
        for(let i = 0; i < this.n; i++) {
            let str = `${ i } : `;
            let iterator = new AdjIterator(this, i);

            for(let j = iterator.begin(); !iterator.end(); j = iterator.next()) {
                str += `from ${ j.V() } to ${ j.W() } weight ${ j.Weight() } `;
            }

            console.log(str);
        }
    }
}

class AdjIterator {

    // 返回带权稠密图的, 所有v节点的邻节点
    constructor(weightedDenseGraph, v) {
        this.weightedDenseGraph = weightedDenseGraph;
        this.v = v;
        this.index = -1; // 因为在稠密图中哪个是第一个起点的索引还不知道，所以设为-1
    }

    begin() {
        // 返回开始的节点
        this.index = -1;
        
        return this.next();
    }

    end() {
        return this.index >= this.weightedDenseGraph.graph[this.v].length;
    }

    next() {
        for(this.index++; this.index < this.weightedDenseGraph.graph[this.v].length; this.index++) {
            if(this.weightedDenseGraph.graph[this.v][this.index] !== null) 
                return this.weightedDenseGraph.graph[this.v][this.index];
        }

        return null;
    }
}

module.exports = WeightedDenseGraph;
