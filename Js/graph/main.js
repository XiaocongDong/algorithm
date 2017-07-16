const DenseGraph = require("./DenseGraph");
const SparseGraph = require("./SparseGraph");
const { generateEdges, readGraph } = require("./util");
const Component = require("./Component");

// 测试稀疏图和稠密图
let size = 10;

let denseGraph = new DenseGraph(size, false);
let sparseGraph = new SparseGraph(size, false);

// let edges = generateEdges(0, size - 1, 2);

// for(let edge of edges) {
//     denseGraph.addEdge(edge.v, edge.w);
//     sparseGraph.addEdge(edge.v, edge.w);
// }

readGraph(denseGraph);
readGraph(sparseGraph);

// denseGraph.printGraph();
// console.log();
// sparseGraph.printGraph();
denseGraph.printGraph();
let component = new Component(denseGraph);

// console.log(component.getComponentCount());
console.log(component.isConnected(8, 1))