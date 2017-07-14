const generateEdges = (start, end, size) => {

    let edges = new Array();

    for(let i = 0; i < size; i++) {
        let v = Math.floor(Math.random() * (end - start) + start);
        let w = Math.floor(Math.random() * (end - start) + start);

        edges.push({v, w});
    }

    return edges;
}


module.exports = {
    generateEdges
}
