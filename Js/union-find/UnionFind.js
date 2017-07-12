class UnionFind {

    constructor(n) { 
        this.ids = new Array();
        this.n = n;
        for(let i = 0; i < n; i++) {
            this.ids.push(i);
        }
    }

    find(p) {
        return this.ids[p];
    }

    isConnected(p, q) {
        // 判断数据集里面的元素是否连接在一起
        return this.find(p) == this.find(q);
    }

    unionElements(p, q) {
        // 将两个数据集的元素进行连接
        let pID = this.ids[p];
        let qID = this.ids[q];

        if(pID === qID) 
            return;
        
        // 把所有的和p连接的元素的ID改为q的ID来将两个并集连接在一起
        for(let i = 0; i < this.n; i++) {
            if(this.ids[i] == pID) 
                this.ids[i] = qID
        }
    }
}

let unionFind = new UnionFind(10);

unionFind.unionElements(0, 9);
unionFind.unionElements(9, 8);
console.log(unionFind.isConnected(9, 0));
console.log(unionFind.isConnected(0, 7));
