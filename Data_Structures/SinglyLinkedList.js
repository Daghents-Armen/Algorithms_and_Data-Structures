// Singly Linked List - a linear data structure where each node
// points to the next node. Supports efficient insertion and
// deletion at head or middle positions.


class Node{
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }
}

class SinglyLinkedlist{
    #tail = null;
    #head = null;
    #size = 0;

    constructor(iterables){
        if(iterables){
            for (let i = 0; i < iterables.length; ++i) {
                this.pushback(iterables[i]);
            }
        }
    }

    pushback(elem){
        let newNode = new Node(elem);

        if(!this.#head){
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            this.#tail.next = newNode;
            this.#tail = newNode;
        }

        ++this.#size;
    }

    pushfront(elem){
        let newNode = new Node(elem);

        if(!this.#head){
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            
            newNode.next = this.#head;
            this.#head = newNode;
        }

        ++this.#size;
    }

    popfront(){
        if(!this.#head){
            return null;
        }

        if(!this.#head.next){
            let val = this.#head.data;
            this.#head = null;
            this.#tail = null;
            --this.#size;
            return val;
        }

        --this.#size;
        let val = this.#head.data;
        this.#head = this.#head.next;
        return val;
    }

    popback(){
        if(!this.#head){
            return null;
        }

        if(!this.#head.next){
            let value = this.#head.data;
            this.#head = null;
            this.#tail = null;
            --this.#size;
            return value;
        }

        --this.#size;
        let current = this.#head;
        while(current.next.next !== null){
            current = current.next;
        }
        let value = current.next.data;
        current.next = null;
        this.#tail = current;
        return value;
    }

    isEmpty(){
        return this.#size === 0;
    }

    clear(){
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    size(){
        return this.#size;
    }

    front(){
        return this.#head ? this.#head.data : null;
    }

    back(){
        return this.#tail ? this.#tail.data : null;
    }

    at(index){
        if(index < 0 || index >= this.#size){
            return null;
        }

        let current = this.#head;
        let i = 0;

        while(i < index){
            current = current.next;
            ++i;
        }

        return current.data;
    }

    insert(index, value){
        if(index < 0 || index > this.#size){
            return null;
        }

        if(index === 0){
            this.pushfront(value);
            return;
        }

        if(index === this.#size){
            this.pushback(value);
            return;
        }

        let newNode = new Node(value);

        let current = this.#head;
        let i = 0;

        while(i < index - 1){
            current = current.next;
            ++i;
        }

        newNode.next = current.next;
        current.next = newNode;
        ++this.#size;
    }

    erase(index){
        if(index < 0 || index >= this.#size){
            return null;
        }
        
        if(index === 0){
           return this.popfront();
        }

        if(index === this.#size - 1){
           return this.popback();
        }

        let current = this.#head;
        let i = 0;
        while(i < index - 1){
            current = current.next;
            ++i;
        }

        --this.#size;
        let val = current.next.data;
        current.next = current.next.next;
        return val;
    }

    remove(value){
        if(!this.#head){
            return null;
        }
        
        if(this.#head.data === value){
            let val = this.#head.data;
            this.#head = this.#head.next;
            --this.#size;
            return val;
        }

        let current = this.#head;

        while(current.next && current.next.data !== value){
            current = current.next;
        }

        if(!current.next) return null;

        let val = current.next.data;
        current.next = current.next.next;

        if(!current.next) this.#tail = current;

        --this.#size;
        return val;
    }

    reverse(){
        let prev = null;
        let current = this.#head;
        this.#tail = this.#head;

        while(current){
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.#head = prev;
    }

    print(){
        if(!this.#head) return null;

        let current = this.#head;
        let str = '';
        while(current){
            str += current.data + '->'
            current = current.next;
        }
        str += null;
        console.log(str);
    }

    merge(left, right){
        if(!left)return right;
        if(!right)return left;

        let dummy = new Node(null); 
        let current = dummy;

        while(left && right){
            if(left.data < right.data){
                current.next = left;
                left = left.next;
            } else {
                current.next = right;
                right = right.next;
            }
            current = current.next;
        }

        if(left){
            current.next = left;
        }

        if(right){
            current.next = right;
        }

        return dummy.next;
    }

    merge_sort(head){
        if(!head || !head.next) return head;

        let fast = head.next;
        let slow = head;

        while(fast && fast.next){
            fast = fast.next.next;
            slow = slow.next;
        }

        let mid = slow.next;
        slow.next = null;

        let left = this.merge_sort(head);
        let right = this.merge_sort(mid);

        return this.merge(left, right);
    }
}

let list = new SinglyLinkedlist();

for (let i = 0; i < 50; ++i) {
    let num = Math.floor(Math.random() * 100) + 1;
    list.pushback(num);
}

list.print();