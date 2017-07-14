const DenseGraph = require("./DenseGraph");
const SparseGraph = require("./SparseGraph");
const { generateEdges } = require("./util");

// 测试稀疏图和稠密图
let size = 10;

let denseGraph = new DenseGraph(size, true);
let sparseGraph = new SparseGraph(size, true);

let edges = generateEdges(0, size - 1, 2);

for(let edge of edges) {
    denseGraph.addEdge(edge.v, edge.w);
    sparseGraph.addEdge(edge.v, edge.w);
}

denseGraph.printGraph();
console.log();
sparseGraph.printGraph();