const unWeightedGraph = {
    vertexs: 13,
    edges: 3,
    data: [
        [0, 1],
        [3, 4],
        [6, 8],
        [6, 9],
        [9, 5],
        [5, 0],
        [1, 2],
        [1, 3],
        [5, 4]
    ]
}

const weightedGraph = {
    vertexs: 10,
    data: [
        [0, 1, 3],
        [0, 6, 8],
        [1, 4, 10],
        [3, 4, 10],
        [1, 2, 5],
        [2, 3, 8],
        [3, 5, 7],
        [6, 8, 4],
        [8, 9, 16],
        [9, 5, 7],
        [7, 2, 5]
    ]
}

module.exports = {
    weightedGraph,
    unWeightedGraph
}