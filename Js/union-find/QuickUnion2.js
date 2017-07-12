// 在quickunion里面，将两个节点连接时，没有考虑到根节点现在
// 的连接数，在随机的情况下可能使子树越来越深, e.g.
// 1     9
// ^     
// |     
// 2
// ^
// |
// 3
// 如果要将 9 和 3 连接起来， 应该将 9 的根节点（就是9本身）连接到 3 的根节点上面， 这样可以使树的深度最小

// 在这里有两种优化方案，第一种是根据子树的size的大小来决定哪个子树连接在哪个子树上面，另外一个优化方案是根据
// depth来决定， 大多数情况下根据size就可以了，对于某些极端的测试用例可以用depth, 下面叫做rank
// ------- optimization ---------

class QuickUnion2 {

    constructor(n) {
        this.n = n;
        // 该数组存储根节点当前的层数
        this.ranks = new Array();
        // 该数组存储根节点
        this.parents = new Array();
        
        for(let i = 0; i < n; i++) {
            this.ranks.push(1);
            this.parents.push(i);
        }
    }

    findParent(p) {
        while(this.parents[p] !== p) {
            p = this.parents[p];
        }

        return p;
    } 

    unionElements(p, q) {
        let pParent = this.findParent(p);
        let qParent = this.findParent(q);

        if(pParent === qParent) {
            return;
        }

        if(this.ranks[pParent] > this.ranks[qParent]) {
            this.parents[qParent] = pParent;
        }else if(this.ranks[pParent] < this.ranks[qParent]){
            this.parents[pParent] = qParent;
        }else {
            // 两棵子树的高度一样, 合并之后一棵子树的层数要加1
            this.parents[pParent] = qParent;
            this.ranks[qParent] += 1;
        }
    }

    isConnected(p, q) {
        return this.findParent(p) === this.findParent(q); 
    }
}

quickUnion = new QuickUnion2(10);
quickUnion.unionElements(1, 2);
quickUnion.unionElements(3, 1);
quickUnion.unionElements(9, 8);
quickUnion.unionElements(8, 3);

console.log(quickUnion.isConnected(8, 1));
