const DenseGraph = require("./DenseGraph");
const SparseGraph = require("./SparseGraph");
const WeightedDenseGraph = require("./WeightedDenseGraph");
const WeightedSparseGraph = require("./WeightedSparseGraph");
const { generateEdges, readUnweightedGraph, readWeightedGraph } = require("./util");
const Component = require("./Component");
const Path = require("./Path");
const ShortestPath = require("./ShortestPath");

// 测试稀疏图和稠密图
let size = 10;

let denseGraph = new DenseGraph(size, false);
let sparseGraph = new SparseGraph(size, false);

// let edges = generateEdges(0, size - 1, 2);

// for(let edge of edges) {
//     denseGraph.addEdge(edge.v, edge.w);
//     sparseGraph.addEdge(edge.v, edge.w);
// }

readUnweightedGraph(denseGraph);
readUnweightedGraph(sparseGraph);

// denseGraph.printGraph();
// console.log();
// sparseGraph.printGraph();
// denseGraph.printGraph();
// let component = new Component(denseGraph);

// console.log(component.getComponentCount());
// console.log(component.isConnected(8, 1))

// let path = new Path(denseGraph, 1);
// console.log(path.hasPath(2));
// console.log(path.path(2));
// path.showPath(3);

// let shortestPath = new ShortestPath(denseGraph, 1);
// shortestPath.showPath(8);


let weightedDenseGraph = new WeightedDenseGraph(10, false);
let weightedSparseGraph = new WeightedSparseGraph(10, false);

readWeightedGraph(weightedDenseGraph);
readWeightedGraph(weightedSparseGraph);

// weightedDenseGraph.printGraph();
// console.log(weightedDenseGraph.E())

weightedSparseGraph.printGraph();
console.log(weightedSparseGraph.E());
