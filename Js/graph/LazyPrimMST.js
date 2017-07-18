const MinHeap = require("./MinHeap");

class LazyPrimMST {

    constructor(graph) {
        this.graph = graph;
        this.minHeap = new MinHeap();
        this.marked = new Array(graph.V()).fill(false);
        this.mst = new Array();
        this.weight = 0;

        this.computeMST();
    }

    computeMST() {
        this.visit(0);

        while(!this.minHeap.isEmpty()) {
            let edge = this.minHeap.extractMin();

            // 如果一个边的两侧都已经被访问过了，推断可知最小堆里面的边两边的点肯定有一个已经被访问过了
            // 如果两个顶点都已经被访问过了，则这个边不是横切边
            if(this.marked[edge.v] === this.marked[edge.w]) {
                continue;
            }

            this.mst.push(edge);

            if(this.marked[edge.v]) {
                // 如果v已经被访问过，访问对边
                this.visit(edge.w);
            }else {
                // 如果w已经被访问过，访问对边
                this.visit(edge.v);
            }
        }

        for(let edge of this.mst) {
            this.weight += edge.weight;
        }
    }

    // 访问当前的节点
    visit(v) {
        // 首先将节点标记为已经被访问
        this.marked[v] = true;
        let iterator = new this.graph.AdjIterator(this.graph, v);

        // 遍历该访问节点的所有邻边
        for(let edge = iterator.begin(); !iterator.end(); edge = iterator.next()) {
            // 判断该边的对面节点是否被访问过
            if(!this.marked[edge.other(v)]) {
                // 将该节点加入到最小堆中
                this.minHeap.insert(edge);
            }
        }
    }

    mstEdges() {
        return this.mst;
    }

    result() {
        return this.weight;
    }

    printMST() {
        for(let edge of this.mst) {
            console.log(edge.v, " -> ", edge.w);
        }
    }
}

module.exports = LazyPrimMST;
