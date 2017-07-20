const IndexMinHeap = require("./IndexMinHeap");

class PrimMST {

    constructor(graph) {
        this.graph = graph;
        this.imp = new IndexMinHeap(graph.V());
        this.marked = new Array(graph.v).fill(false);
        this.mst = new Array();
        this.mstWeight = 0;

        this.visit(0);

        while(!this.imp.isEmpty()) {
            let index = this.imp.getMinIndex();
            let edge = this.imp.extractMin();
            this.mst.push(edge);
            this.visit(index);
        }
    }

    visit(index) {
        this.marked[index] = true;

        let iterator = new this.graph.AdjIterator(this.graph, index);

        for(let edge = iterator.begin(); !iterator.end(); edge = iterator.next()) {
            let w = edge.other(index);
            // console.log("adj ", index, w);
            if(this.marked[w])
                continue;

            if(!this.imp.contain(w)) {
                this.imp.insert(w, edge);
            }else {
                let originalEdge = this.imp.getItem(w);
                if(originalEdge.weight > edge.weight) {
                    this.imp.update(w, edge);
                }
            }
        }
    }

    mstEdges() {
        return this.mst;
    }

    mstWeight() {
        return this.mstWeight;
    }

    printMST() {
        for(let edge of this.mst) {
            console.log(`from ${ edge.v } to ${ edge.w } weight ${ edge.weight }`);
        }
    }
}

module.exports = PrimMST;
