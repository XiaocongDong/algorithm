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
bst.insert(10, 8);
bst.levelOrder();
// console.log(bst.search(10))