const Queue = require('./Queue');

class BST {

    constructor() {
        this.root = null;
    }

    //往二叉搜索树里面添加元素
    insert(key, value) {
    //     非递归实现
    //     if(this.root == null) {
    //         this.root = new TreeNode(key, value);
    //         return;
    //     }

    //     let curr = this.root;

    //     while(true) {
    //         if(curr.key === key) {
    //             curr.value = value;
    //             break;
    //         }

    //         if(curr.key > key) {
                
    //             if(curr.left) {
    //                 curr = curr.left;
    //                 continue;
    //             }else {
    //                 curr.left = new TreeNode(key, value);
    //                 break;
    //             }

    //         }else {

    //             if(curr.right) {
    //                 curr = curr.right;
    //                 continue;
    //             }else {
    //                 curr.right = new TreeNode(key, value);
    //                 break;
    //             }
    //         }
    //     }
    

    //  递归实现
        this.root = this.__insert(this.root, key, value);
    }

    // 私有的insert, 每次传入根节点，然后返回更新的子树的根节点
    __insert(n, key, value) {
        if(n == null) return new TreeNode(key, value);

        if(n.key === key) {
            n.value = value;
            return n;
        }
        else if(n.key < key) {
            // 查看右子树, 返回更新的右子树
            n.right = this.__insert(n.right, key, value);
        }
        else {
            // 左子树，返回更新的左子树
            n.left = this.__insert(n.left, key, value);
        }

        return n;
    }

    preOrder() {
        // 前序遍历
        this._preOrder(this.root);
    }

    _preOrder(n) {
        if(n !== null) {
            console.log(n.key);
            this._preOrder(n.left);
            this._preOrder(n.right);
        }
    }

     inOrder() {
        // 中序遍历
        // 中序遍历将会按照顺序把树打印出来
        // 相当于排序，原因就是中间节点的值都要比
        // 左子树所有节点的值都要大， 比右子树的所有节点的值都要小
        this._inOrder(this.root);
     }

     _inOrder(n) {
        if(n !== null) {
            this._inOrder(n.left);
            console.log(n.key);
            this._inOrder(n.right);
        }
     }

     postOrder() {
        // 后序遍历，应用是释放资源，
        // 先释放左子树的资源和右子树的资源，然后再释放中间节点的资源
        this._postOrder(this.root);
     }

     _postOrder(n) {
        if(n !== null) {
            this._postOrder(n.left);
            this._postOrder(n.right);
            console.log(n.key);
        }
     }

    printTree() {
        this.__printTree(this.root);
    }

    __printTree(n) {
        // 中序遍历
        if (n == null) return;

        if(n.left) this.__printTree(n.left);
        console.log(n.key);
        if(n.right) this.__printTree(n.right);
    }

    search(key) {
        // 非递归查找
        // let curr = this.root;

        // while(curr) {
        //     if(curr.key === key) return curr.value;
        //     else if(curr.key > key) curr = curr.left;
        //     else curr = curr.right;
        // }

        // return null;

        // 递归查找
        return this._search(this.root, key);
    }

    _search(n, key) {
        if(n == null) return null;

        if(n.key == key) return n.value;
        else if(n.key < key) return this._get(n.right, key);
        else return this._get(n.left, key);
    }

    // 层序遍历
    levelOrder() {
        let nodeQueue = new Queue();
        nodeQueue.push(this.root);

        while(!nodeQueue.isEmpty()) {
            let currNode = nodeQueue.pop();

            if(currNode != null) {
                console.log(currNode.key);
                currNode.left && nodeQueue.push(currNode.left);
                currNode.right && nodeQueue.push(currNode.right)
            }
        }
    }

    minimum() {
        // 返回最小的key
        if(this.root == null) return null;

        let miniNode = this._minimum(this.root);

        return miniNode.key;
    }

    _minimum(n) {
        if(n.left == null) 
            return n;
        
        return this._minimum(n.left);
    }

    maximum() {
        // 返回最大的key
        if(this.root == null) 
            return null;

        let maxNode = this._maximum(this.root);

        return maxNode.key;
    }

    _maximum(n) {
        if(n.right == null) return n;

        return this._maximum(n.right);
    }

    removeMin() {
        // 删除树里面的最小节点
        if(this.root !== null) 
            this.root = this._removeMin(this.root);
    }

    _removeMin(n) {
        // 删除以n为根的最小节点, 并返回最新的n节点
        if(n.left === null) { 
            // 删除最小节点的时候，如果最小节点不存在右子树，return null, 如果存在右子树则返回右子树
            return n.right; 
        }else {
            n.left = this._removeMin(n.left); 
            return n;
        }
    }

    removeMax() {
        // 删除树里面的最大节点
        if(this.root !== null) 
            this.root = this._removeMax(this.root);
    }

    _removeMax(n) {
        // 删除子树的最大节点并返回最新的节点
        if(n.right === null) {
            // 删除最大节点的时候，如果最大节点不存在左子树，return null, 如果存在左子树返回左子树
            return n.left;
        }
        else {
            n.right = this._removeMax(n.right);
            return n;
        }
    }

    remove(key) {
        // 找到key所在的节点，然后删除掉
        // 被找到的节点可能有三种连接情况
        // 1. 只有左节点
        // 2. 只有右节点
        // 3. 没有子树
        // 4. 包含左节点和右节点
        // 对于上面的1， 2， 3都是属于只有一边子树的，或者没有子树, 没有子树的情况
        // 可以归结为只有一种子树的情况，因为返回null 最后的结果都是一样的
        // 
        // 对于第4种情况，该节点被删除后要从，左子树和右子树里面，选出一个节点出来，代替这个节点，
        // 选择出来的节点要满足以下两个条件，首先比左子树的所有节点都大，然后比右子树所有节点都要小，
        // 要同时满足以上两种情况只能是右子树的最小节点, 或者是左子树的最大值
        if(this.root == null) return null;

        this.root = this._remove(this.root, key);
    }

    // 删除以n为根节点的树里面键为key的节点，然后返回更新后
    // 二叉树的根
    _remove(n, key) {
        if(n == null) 
            return null;

        if(n.key === key) {
            // 找到节点
            if(n.left == null) 
                return n.right;
            if(n.right == null) 
                return n.left;

            // 找到右子树的最小值
            let s = this._minimum(n.right);
            // 删除最小值, 并把新的右子树返回
            s.right = this._removeMin(n.right);
            s.left = n.left;
            // 返回新的节点， 这样被找到的值就会被删除
            return s;
        }
        else if(n.key > key) {
            n.left = this._remove(n.left, key);
            return n;
        }
        else {
            n.right = this._remove(n.right, key);
            return n;
        }
    }
}

class TreeNode {

    //树的节点
    constructor(key, value) {
        this.key = key;
        this.value = value;
        // 指针指向左孩子
        this.left = null;
        // 指针指向右孩子
        this.right = null;
    }

} 

let bst = new BST();
bst.insert(10, 2);
bst.insert(12, 1);
// bst.printTree();

bst.insert(11, 4);
bst.insert(1, 10);
// bst.insert(13, 8);
// bst.levelOrder();
// console.log(bst.minimum())
// console.log(bst.maximum())
// bst.inOrder()
// console.log();
// bst.removeMax()
// bst.inOrder()
// console.log()
// bst.removeMax()
// console.log()
// bst.inOrder()

// 删除根节点
// bst.levelOrder();
// bst.remove(10);
// console.log();
bst.levelOrder();
console.log()
bst.remove(10);
bst.levelOrder();
console.log()
bst.remove(12)
bst.levelOrder()


// console.log(bst.search(10))