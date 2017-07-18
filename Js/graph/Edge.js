// 此类为有权图的边
class Edge {

    constructor(v, w, weight) {
        this.v = v;
        this.w = w;
        this.weight = weight;
    }

    V() {
        return this.v;
    }

    W() {
        return this.w;
    }

    Weight() {
        return this.weight;
    }

    other(v) {
        // 返回另外一个顶点
        return v === this.v? this.w: (v === this.w? this.v: null);
    }
}

module.exports = Edge;
