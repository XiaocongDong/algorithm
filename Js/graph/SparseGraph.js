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
}

let sparseGraph = new SparseGraph(10, true);
sparseGraph.addEdge(0, 9);
sparseGraph.addEdge(1, 8);

console.log(sparseGraph.hasEdge(0, 9));
console.log(sparseGraph.hasEdge(9, 0));
console.log(sparseGraph.hasEdge(1, 8));
console.log(sparseGraph.E());