const Stack = require("../data-structure/Stack");

class Path {

    constructor(graph, center) {
        this.graph = graph;
        this.center = center;
        this.froms = new Array(graph.V()).fill(-1);
        this.visisted = new Array(graph.V()).fill(false);
        this.dfs(center);
    }

    dfs(i) {
        this.visisted[i] = true;
        let iterator = new this.graph.AdjIterator(this.graph, i);

        for(let j = iterator.begin(); !iterator.end(); j = iterator.next()) {
            if(!this.visisted[j]) {
                this.froms[j] = i;
                this.dfs(j);
            }
        }
    }

    hasPath(v) {
        return this.visisted[v];
    }

    path(v) {
        if(!this.hasPath(v)) {
            return [];
        }

        let stack = new Stack();
        let p = v;

        while(this.froms[p] !== -1) {
            stack.push(p);
            p = this.froms[p];
        }

        stack.push(p);

        let path = new Array();
        while(!stack.isEmpty()) {
            path.push(stack.pop());
        }

        return path;
    }

    showPath(v) {
        let path = this.path(v);
        let showStr = "";

        for(let i = 0; i < path.length; i++) {
            showStr += path[i];

            if(i !== path.length - 1) {
                showStr += " -> "
            }
        }

        if(showStr.length !== 0) {
            console.log(showStr);
        }
    }
}

module.exports = Path;
