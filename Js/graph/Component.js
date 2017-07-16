// 计算一个图的连通分量的个数
// 深度遍历
class Component {

    constructor(graph) {
        this.graph = graph; //储存图
        this.count = 0; // 储存图的连通分量的个数
        this.visted = new Array(graph.V()).fill(false); // 存储图中的节点是否被遍历过的信息，false 代表没有
        this.ids = new Array(graph.V()).fill(-1); // 给图中的所有节点设置一个id, 具有相同id的节点表示他们相连
        this.setComponens();
    }

    setComponens() {
        for(let i = 0; i < this.visted.length; i++) {
            if(!this.visted[i]) {
                this.dfs(i);
                this.count++;
            }
        }
    }

    // 深度优先遍历， depth first search
    dfs(i) {
        // 被访问过的节点将visted值设为true
        this.visted[i] = true;
        // 将当前的节点的id值设置为count的值
        this.ids[i] = this.count;
        // 获取图的iterator
        let iterator = new this.graph.AdjIterator(this.graph, i);

        for(let j = iterator.begin(); !iterator.end(); j = iterator.next()) {
            // 所有没有被访问过的节点都讲visited设为true
            if(!this.visted[j]) {
                this.dfs(j);
            }
        }
    }

    getComponentCount() {
        return this.count;
    }

    isConnected(v, w) {
        return this.ids[v] === this.ids[w];
    }
}

module.exports = Component;
