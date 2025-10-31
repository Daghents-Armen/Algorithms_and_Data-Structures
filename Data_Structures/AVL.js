class Node{
    constructor(value){
        this.data = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL{
    constructor(value){
        if(value === undefined || value === null){
            this.root = null;
            return;
        }
        this.root = new Node(value);
    }

    get_height(node){
        return node ? node.height : 0;
    }

    _bf(node){
        return this.get_height(node.left) - this.get_height(node.right);
    }

    _update(node){
        return 1 + Math.max(this.get_height(node.left), this.get_height(node.right));
    }

    right_rotate(node){
        let newroot = node.left;
        node.left = newroot.right;
        newroot.right = node;

        newroot.height = this._update(newroot);
        node.height = this._update(node);

        return newroot;
    }

    left_rotate(node){
        let newroot = node.right;
        node.right = newroot.left;
        newroot.left = node;

        newroot.height = this._update(newroot);
        node.height = this._update(node);

        return newroot;
    }

    _insert(node, value){
        if(!node)return new Node(value);

        if(value > node.data){
            node.right = this._insert(node.right, value);
        } else if(value < node.data) {
            node.left = this._insert(node.left, value);
        } else {
            return node;
        }

        node.height = this._update(node);
        let bf = this._bf(node);

        if(bf > 1 && node.left.data > value){
            node = this.right_rotate(node);
        } else if(bf > 1 && node.left.data < value){
            node.left = this.left_rotate(node.left);
            node = this.right_rotate(node);
        } else if(bf < -1 && node.right.data < value){
            node = this.left_rotate(node);
        } else if(bf < -1 && node.right.data > value){
            node.right = this.right_rotate(node.right);
            node = this.left_rotate(node);
        }

        return node;
    }

    insert(value){
        this.root = this._insert(this.root, value);
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
        console.log(res);
    }

    inorder(){
        if(!this.root) return;

        let stack = new Stack();
        let current = this.root;
        let res = ' ';

        while(current || !stack.isEmpty()){
            while(current){
                stack.push(current);
                current = current.left;
            }
        
            current = stack.pop();
            res += current.data + ' ';
            current = current.right;
        }
        console.log(res);
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
        console.log(res);
    }

    postorder(){
        if(!this.root) return;

        let stack1 = [this.root];
        let stack2 = [];
        let res = ' ';
        while(stack1.length){
            let current = stack1.pop();

            stack2.push(current.data);
            if(current.right) stack1.push(current.right);
            if(current.left) stack1.push(current.left);
        }
        
        while(stack2.length){
            res += stack2.pop().data + ' ';
        }
        console.log(res);
        
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

    clear(){
        this.#size = 0;
        this.#rear = -1;
        this.#front = 0;
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
        if(this.#size === this.#cap) this.resize();

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


let avl = new AVL();
avl.insert(50);
avl.insert(20);
avl.insert(60);
avl.insert(30);
avl.insert(25)

avl.levelorder()
avl.inorder()
avl.preorder()

