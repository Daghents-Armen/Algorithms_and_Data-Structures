// Binary Search Tree - a tree where each node has at most
// two children, with left < parent < right. Supports O(log n)
// average insert, delete, and search, but can degrade to O(n).


class Node{
    constructor(data = null, right = null, left = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST{
    #size = 0;
    constructor(data = null){
        this.root = null;
        if(data){
            this.root = new Node(data);
            ++this.#size;
        }
    }

    add(value){
        if(!this.root){
            this.root = new Node(value);
            ++this.#size;
            return;
        }

        let newnode = new Node(value);
        let current = this.root;

        while(true){
            if(current.data > value){
                if(!current.left){
                    current.left = newnode;
                    ++this.#size;
                    return;
                }
                current = current.left;
            } else if(current.data < value){
                if(!current.right){
                    current.right = newnode;
                    ++this.#size;
                    return;
                }
                current = current.right;
            } else {
                return;
            }
        }
    }

    _add(node, value){
        if(!node) return new Node(value);

        if(node.data < value){
            node.right = this._add(node.right, value);
        } else {
            node.left = this._add(node.left, value);
        }
        return node;
    }

    __add(value){
        this.root = this._add(this.root, value);
    }

    _find_min(node){
        while(node && node.left){
            node = node.left;
        }
        return node;
    }

    _remove(node, value){
        if(!node) return null;

        if(value > node.data){
            node.right = this._remove(node.right, value);
        } else if(value < node.data){
            node.left = this._remove(node.left, value);
        } else {
            if(!node.right) return node.left;
            if(!node.left) return node.right;
            let min = this._find_min(node.right);
            node.data = min.data;
            node.right = this._remove(node.right, min.data);
        }
        return node;
    }

    remove(value){
        this.root = this._remove(this.root, value);
    }

    getheight(){
        let height = 0;
        if(!this.root) return height;

        let queue = new Queue;
        queue.enque(this.root);
        while(!queue.isEmpty()){
            let level = queue.size();
            ++height;
            for (let i = 0; i < level; ++i){
                let current = queue.deque();

                if(current.left) queue.enque(current.left);
                if(current.right) queue.enque(current.right);
            }
        }
        return height;
    }

    _getheight(node){
        if(!node) return 0;

        let leftside = this._getheight(node.left);
        let rightside = this._getheight(node.right);

        return Math.max(leftside, rightside) + 1;
    }

    __getheight(){
        return this._getheight(this.root);
    }

    levelorder(){
        if(!this.root) return;

        let res = ' ';
        let queue = new Queue();
        queue.enque(this.root);
        while(!queue.isEmpty()){
            let level = queue.size();
            for (let i = 0; i < level; ++i) {
                let current = queue.deque();

                res += current.data + ' ';
                if(current.left) queue.enque(current.left);
                if(current.right) queue.enque(current.right);
            }
        }
        return res;
    }

    inorder(){
        if(!this.root) return;

        let stack = new Stack();
        let current = this.root;
        let str = ' ';
        while(current || !stack.isEmpty()){
            while(current){
                stack.push(current);
                current = current.left;
            }
            
            current = stack.pop();
            str += current.data + ' ';
            current = current.right;
        }
        return str;
    }

    _inorder(node, str){
        if(!node) return null;

        this._inorder(node.left, str);
        str += node.data + ' ';
        this._inorder(node.right, str);
        return str;
    }

    __inorder(){
        return this._inorder(this.root, ' ');
    }

    preorder(){
        if(!this.root) return;
        let res = ' ';
        let stack = [this.root];
        while(stack.length){
            let current = stack.pop();

            res += current.data + ' ';

            if(current.right) stack.push(current.right);
            if(current.left) stack.push(current.left);
        }
        return res;
    }

    _preorder(node, str){
        if(!node) return null;

        str += node.data;
        this._preorder(node.left, str);
        this._preorder(node.right, str);
        return str;
    }

    __preorder(){
        return this._preorder(this.root, ' ');
    }

    postorder(){
        if(!this.root) return;

        let res = [];
        let stack1 = [this.root];
        let stack2 = [];

        while(stack1.length){
            let node = stack1.pop();

            stack2.push(node);
            if(node.left) stack1.push(node.left);
            if(node.right) stack1.push(node.right);
        }

        while(stack2.length){
            res.push(stack2.pop().data);
        }
        return res;
    }

    _postorder(node, stack){
        if(!node) return stack;

        this._postorder(node.left, stack);
        this._postorder(node.right, stack);
        stack.push(node.data);
    }

    __postorder(){
        let stack = [];
        return this._postorder(this.root, stack);
    }

}

class Queue{
    #size = 0;
    #arr = null;
    #rear = -1;
    #front = 0;
    #cap = 0;

    constructor(cap = 8){
        this.#size = 0;
        this.#rear = -1;
        this.#front = 0;
        this.#cap = cap;
        this.#arr = new Array(this.#cap);
    }

    enque(elem){
        if(this.#size === this.#cap){
            throw new Error("size is full");
    }

        this.#rear = (this.#rear + 1) % this.#cap;
        this.#arr[this.#rear] = elem;
        ++this.#size;
    }

    deque(){
        if(this.#size === 0){
            throw new Error("there is no element to remove");
        }

        let value = this.#arr[this.#front];
        this.#front = (this.#front + 1) % this.#cap;
        --this.#size;
        return value;
    }

    isEmpty(){
        return this.#size === 0;
    }

    isFull(){
        return this.#size === this.#cap;
    }

    size(){
        return this.#size;
    }
}


class Stack{
    #top = -1;
    #size = 0;
    #CAP_EXPONENT = 2;
    #cap = 0;
    #arr = null;

    constructor(cap = 8){
        this.#top = -1;
        this.#arr = new Array(cap);
        this.#size = 0;
        this.#cap = cap;
    }   

    push(elem){

        ++this.#top;
        this.#arr[this.#top] = elem;
        ++this.#size;
    }

    pop(){
        if(this.#size === 0) return -1;

        let value = this.#arr[this.#top];
        this.#arr[this.#top--] = null;
        --this.#size;
        return value;
    }

    isEmpty(){
        return this.#size === 0;
    }

    size(){
        return this.#size;
    }
}

