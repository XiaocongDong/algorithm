const Queue = require("../data-structure/Queue");
const Stack = require("../data-structure/Stack");

class ShortestPath {

    // 通过广度遍历的办法找到，距离中间点center的所有最短路径
    constructor(graph, center) {
        this.graph = graph;
        this.center = center;
        // 存储图的某一个节点有没有入队，不一定要被访问过，入队以后被访问是迟早的事情
        this.visisted = new Array(graph.V()).fill(false);
        // 存储遍历过程的入队信息
        this.queue = new Queue();
        // 存储节点到中心点center的层数
        this.ord = new Array(graph.V()).fill(-1);
        // 存储节点跳转的信息
        this.froms = new Array(graph.V()).fill(-1);

        this.queue.push(center);
        this.visisted[center] = true;
        this.ord[center] = 0;

        while(!this.queue.isEmpty()) {
            let p = this.queue.pop();
            let iterator = new graph.AdjIterator(graph, p);

            for(let j = iterator.begin(); !iterator.end(); j = iterator.next()) {
                if(!this.visisted[j]) {
                    this.visisted[j] = true;
                    this.ord[j] = this.ord[p] + 1;
                    this.froms[j] = p;
                    this.queue.push(j);
                }
            }
        }
    }

    hasPath(w) {
        return this.visisted[w];
    }

    path(w) {
        let path = new Array();
        let stack = new Stack();
        if(this.hasPath(w)) {
            let p = w;
            while(this.froms[p] !== -1) {
                stack.push(p);
                p = this.froms[p];
            }
            
            stack.push(p);
        }

        while(!stack.isEmpty()) {
            path.push(stack.pop());
        }

        return path;
    }

    showPath(w) {
        if(!this.hasPath(w)) return;

        let path = this.path(w);
        let showStr = "";

        for(let j = 0; j < path.length; j++) {
            showStr += path[j];

            if(j !== path.length - 1) {
                showStr += " -> ";
            }
        }

        if(showStr.length !== 0) {
            console.log(showStr);
        }
    }

    length(w) {
        return this.ord[w];
    }
}

module.exports = ShortestPath;
