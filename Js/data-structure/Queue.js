class Queue {

    constructor() {
        this.queue = new Array();
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length == 0;
    }

    push(d) {
        this.queue.push(d)
    }

    pop() {
       return this.queue.shift();
    }
}

module.exports = Queue;
