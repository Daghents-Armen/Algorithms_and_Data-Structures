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

    peek(){
        if(this.#size === 0) throw new Error("size is 0");
        
        return this.#arr[this.#front];
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

    print(){
        if(this.#size === 0) return [];

        let res = [];

        for (let i = 0; i < this.#size; ++i) {
            res.push(this.#arr[(this.#front + i) % this.#cap]);
        }

        console.log(res);
    }

    size(){
        return this.#size;
    }
}

let queue = new Queue();
queue.enque(10);
queue.enque(20);
queue.enque(30);
queue.enque(40);
queue.deque(20)
queue.print()