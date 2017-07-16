class Stack {

    constructor() {
        this.stack = new Array();
    }

    push(d) {
        this.stack.push(d);
    }

    pop() {
        return this.stack.pop();
    }

    isEmpty() {
        return this.stack.length === 0;
    }
}

module.exports = Stack;
