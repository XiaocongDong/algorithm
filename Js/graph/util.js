const { unWeightedGraph, weightedGraph } = require("./graph");

const generateEdges = (start, end, size) => {

    let edges = new Array();

    for(let i = 0; i < size; i++) {
        let v = Math.floor(Math.random() * (end - start) + start);
        let w = Math.floor(Math.random() * (end - start) + start);

        edges.push({v, w});
    }

    return edges;
}

const readUnweightedGraph = graph => {
    // 将文件的图读进graph中
    let data = unWeightedGraph.data;

    for(let d of data) {
        graph.addEdge(d[0], d[1]);
    }
}

const readWeightedGraph = graph => {
    let data = weightedGraph.data;

    for(let d of data) {
        graph.addEdge(d[0], d[1], d[2]);
    }
}

module.exports = {
    generateEdges,
    readUnweightedGraph,
    readWeightedGraph
}
