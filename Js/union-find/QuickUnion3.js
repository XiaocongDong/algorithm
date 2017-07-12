// 路径压缩有两种思路， 都是在findParent的过程不断缩短节点到根节点的距离
//  1. 就是如果当前节点不是根节点则将该节点的父节点改为父节点的父节点然后将当前的节点变为该节点的更改后的父节点，
//     这样会实现两个节点的跳跃，但是由于根节点的父节点总是指向它自身，所以这次跳跃不会产生无效索引
//  2. 将所有节点都直接指向根节点, 用递归可以进行，但是当递归的时候涉及到入栈出栈的过程， 会影响到算法运行的效果，
//     有时候这个优化效果可能没有优化一的好, 所以理论可能不同于实践

// 时间复杂度近乎于O(1)

class QuickUnion3 {

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
        // 优化一
        // while(this.parents[p] !== p) {
        //     this.parents[p] = this.parents[this.parents[p]];
        //     p = this.parents[p]
        // }

        // 优化二
        if(this.parents[p] !== p) {
            this.parents[p] = this.findParent(this.parents[p]);
        }

        return this.parents[p];
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


quickUnion = new QuickUnion3(10);
quickUnion.unionElements(0, 1);
quickUnion.unionElements(1, 3);
quickUnion.unionElements(3, 8);
quickUnion.unionElements(9, 1);

console.log(quickUnion.isConnected(9, 3));
