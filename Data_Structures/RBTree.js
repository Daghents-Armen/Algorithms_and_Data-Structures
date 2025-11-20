// Red-Black Tree - a self-balancing binary search tree where each
// node has a color (red or black) to ensure the tree remains balanced.
// Guarantees O(log n) time for insert, delete, and search operations.


const RED = 'red';
const BLACK = 'black';

const colors = {
  red: "\x1b[31m",
  black: "\x1b[30m",
  reset: "\x1b[0m",
};

class Node{
    constructor(data, color = RED, left = null, right = null, parent = null){
        this.data = data;
        this.color = color;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

class RBTree{
    constructor(){
        this.nil = new Node(null);
        this.nil.color = BLACK;
        this.root = this.nil;
    }

    insertfixUp(newnode){
       while(newnode.parent.color === RED){
        let grandparent = newnode.parent.parent;
            if(newnode.parent === grandparent.left){
                let unclenode = grandparent.right;
                if(newnode.parent.color === RED && unclenode.color === RED){
                    newnode.parent.color = BLACK;
                    unclenode.color = BLACK;
                    grandparent.color = RED;
                    newnode = grandparent;
                } else {
                    if(newnode === newnode.parent.right){
                        this.left_rotate(newnode.parent);
                    }

                    newnode.parent.color = BLACK;
                    grandparent.color = RED;
                    this.right_rotate(grandparent);
                }
            } else {
                let unclenode = grandparent.left;
                if(newnode.parent.color === RED && unclenode.color === RED){
                    newnode.parent.color = BLACK;
                    unclenode.color = BLACK;
                    grandparent.color = RED;
                    newnode = grandparent;
                } else {
                    if(newnode === newnode.parent.left){
                        this.right_rotate(newnode.parent);
                    }

                    newnode.parent.color = BLACK;
                    grandparent.color = RED;
                    this.left_rotate(grandparent);
                }
            }
       }

       this.root.color = BLACK;
    }

    left_rotate(current){
        let pivotnode = current.right;
        current.right = pivotnode.left;

        if(pivotnode.left !== this.nil){
            pivotnode.left.parent = current;
        }

        if(current.parent === this.nil){
            this.root = pivotnode;
        } else if(current === current.parent.right){
            current.parent.right = pivotnode;
        } else {
            current.parent.left = pivotnode;
        }

        pivotnode.parent = current.parent;
        pivotnode.left = current;
        current.parent = pivotnode;
    }

    right_rotate(current){
        let pivotnode = current.left;
        current.left = pivotnode.right;

        if(pivotnode.right !== this.nil){
            pivotnode.right.parent = current;
        }

        if(current.parent === this.nil){
            this.root = pivotnode;
        } else if(current === current.parent.right){
            current.parent.right = pivotnode;
        } else {
            current.parent.left = pivotnode;
        }

        pivotnode.parent = current.parent;
        pivotnode.right = current;
        current.parent = pivotnode;
    }

    insert(data){
        let newnode = new Node(data);
        let current = this.root;
        let parentnode = this.nil;

        while(current !== this.nil){
            parentnode = current;
            if(newnode.data < current.data){
                current = current.left;
            } else if(newnode.data > current.data){
                current = current.right;
            } else {
                return;
            }
        }

        if(parentnode === this.nil){
            this.root = newnode;
        } else if(parentnode.data > newnode.data){
            parentnode.left = newnode;
        } else {
            parentnode.right = newnode;
        }

        newnode.left = newnode.right = this.nil;
        newnode.parent = parentnode;
        this.insertfixUp(newnode);
    }

    transplant(u, v){
        if(!u || !v) return;

        if(u.parent === null){
            this.root = v;
        } else if(u === u.parent.left){
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }

        v.parent = u.parent;
    }

    minimum(val){
        while(val.left !== this.nil){
            val = val.left;
        }

        return val;
    }

    search(data){
        if(!this.root) return null;

        let curr = this.root;
        while(curr){
            if(curr.data === data){
                return curr;
            } else if(curr.data > data){
                curr = curr.left;
            } else {
                curr = curr.right;
            }

        }
        return null;
    }   

    print(node = this.root, indent = "", last = true) {
    if (node !== this.nil && node.data !== null) {
        console.log(indent + (last ? "└─ " : "├─ ") + this.colorNode(node));
        indent += last ? "   " : "│  ";
        this.print(node.left, indent, false);
        this.print(node.right, indent, true);
        }
    }

    colorNode(node) {
    const colorCode = node.color === RED ? colors.red : colors.black;
    return colorCode + node.data + colors.reset + ` (${node.color})`;
}

}

let rb = new RBTree()

rb.insert(50);
rb.insert(45);
rb.insert(23);
rb.print();
