const assert = require('assert');

class QuickUnion {
    
    constructor(n) {
        this.parents = new Array();
        this.n = n;
        //        0 1 2 3 4 5 6
        //        ---------------
        // parent 0 1 2 3 4 5 6 指向父节点
        for(let i = 0; i < n; i++) {
            // 开始的时候每个节点的父节点是它本身
            this.parents.push(i); 
        }
    }

    findParent(p) {
        // 返回p节点所在的图的父节点
        while(this.parents[p] !== p) {
            p = this.parents[p];
        }

        return p;
    }

    unionElements(p, q) {
        let pParent = this.findParent(p);
        let qParent = this.findParent(q);

        if(pParent === qParent)
        // 已经连接在一起，直接返回 
            return;
        
        // 将 q 节点的父亲节点的父节点指向p 节点的父节点
        this.parents[qParent] = pParent;
    }

    isConnected(p, q) {
        return this.findParent(p) === this.findParent(q);
    }
}

quickUnion = new QuickUnion(10);
// quickUnion.findParent(-1);
quickUnion.unionElements(1, 3);
quickUnion.unionElements(5, 1);
quickUnion.unionElements(10, 3);

console.log(quickUnion.isConnected(1, 3));
console.log(quickUnion.isConnected(10, 1));
console.log(quickUnion.isConnected(1, 8));
