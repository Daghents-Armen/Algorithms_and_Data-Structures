class Node{
    constructor(value){
        this.data = value;
        this.right = null;
        this.left = null;
        this.height = 1;
    }
}

class AVL{
    constructor(value){
        if(value === null || value === undefined){
            this.root = value;
            return;
        }
        this.root = new Node(value);
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

    get_height(node){
        return node ? node.height : 0;
    }

    _update(node){
        return 1 + Math.max(this.get_height(node.left), this.get_height(node.right));
    }

    _bf(node){
        return this.get_height(node.left) - this.get_height(node.right);
    }

    right_rotate(node){
        let newroot = node.left;
        node.left = newroot.right;
        newroot.right = node;

        node.height = this._update(node);
        newroot.height = this._update(newroot);
        return newroot;
    }

    left_rotate(node){
        let newroot = node.right;
        node.right = newroot.left;
        newroot.left = node;

        node.height = this._update(node);
        newroot.height = this._update(newroot);
        return newroot;
    }

    _insert(node, value){
        if(!node){
            return new Node(value);
        }

        if(value > node.data){
            node.right = this._insert(node.right, value);
        } else if(value < node.data){
            node.left = this._insert(node.left, value);
        } else {
            return node;
        }

        node.height = this._update(node);
        let bf = this._bf(node);
        
        if(bf > 1 && node.left?.data > value){
            node = this.right_rotate(node);
        } else if(bf > 1 && node.left?.data < value){
            node.left = this.left_rotate(node.left);
            node = this.right_rotate(node);
        } else if(bf < -1 && node.right?.data < value){
            node = this.left_rotate(node);
        } else if(bf < -1 && node.right?.data > value){
            node.right = this.right_rotate(node.right);
            node = this.left_rotate(node);
        }

        return node;
    }

    insert(value){
        this.root = this._insert(this.root, value);
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

    find_min(node){
        while(node && node.left){
            node = node.left;
        }

        return node;
    }

    _remove(node, value){
        if(!node) return null;

        if(value > node.data){
            node.right = _remove(node.right, value);
        } else if(value < node.data){
            node.left = _remove(node.left, value);
        } else {
            if(!node.left) return node.right;
            if(!node.right) return node.left;

            let min = this.find_min(node.right);
            node.data = min.data;
            node.right = this._remove(node.right, min.data);
        }

        node.height = this._update(node);
        let bf = this._bf(node);
        
        if(bf > 1 && node.left?.data > value){
            node = this.right_rotate(node);
        } else if(bf > 1 && node.left?.data < value){
            node.left = this.left_rotate(node.left);
            node = this.right_rotate(node);
        } else if(bf < -1 && node.right?.data < value){
            node = this.left_rotate(node);
        } else if(bf < -1 && node.right?.data > value){
            node.right = this.right_rotate(node.right);
            node = this.left_rotate(node);
        }

        return node;

    }

    remove(value){
        this.root = this._remove(this.root, value);
    }
}

let avl = new AVL();
avl.insert(30);
avl.insert(20);
avl.insert(10);