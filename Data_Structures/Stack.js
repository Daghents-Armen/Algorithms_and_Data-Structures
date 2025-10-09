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

    peek(){
        if(this.#size === 0) return -1;

        return this.#arr[this.#top];
    }

    isEmpty(){
        return this.#size === 0;
    }

    size(){
        return this.#size;
    }

    clear(){
        this.#size = 0;
        this.#top = -1;
    }

    search(elem){
        if(this.#size === 0) return -1;

        let count = 0;

        for (let i = this.#top; i >= 0; --i) {
            if(this.#arr[i] === elem){
                return count;
            }
            ++count;
        }

        return -1;
    }

    contains(elem){
        if(this.#size === 0) return false;

        for (let i = this.#top; i >= 0; --i) {
            if(this.#arr[i] === elem){
                return true;
            }
        }

        return false;
    }

    toArray(){
        if(this.#size === 0) return [];

        let res = [];
        
        for (let i = this.#top; i >= 0; --i) {
            res.push(this.#arr[i]);
        }

        return res;
    }

    resize(){
        this.#cap *= this.#CAP_EXPONENT;

        let newarr = new Array(this.#cap);
        for (let i = 0; i <= this.#top; ++i) {
           newarr[i] = this.#arr[i];
        }

        this.#arr = newarr;
    }

    clone(){
        let cpy = new Array(this.#cap);

        for (let i = 0; i <= this.#top; ++i) {
            cpy[i] = this.#arr[i];
        }

        return cpy;
    }

    print(){
        if(this.#size === 0) return;

        for (let i = 0; i <= this.#top; ++i) {
            console.log(this.#arr[i]);
        }
    }

    reverse(){
        let newarr = new Array(this.#cap);

        for (let i = 0; i <= this.#top; ++i) {
            newarr[i] = this.#arr[this.#top - i];
        }

        return newarr;
    }

    [Symbol.iterator]() {
        let index = this.#top;
        return {
            next: () => {
                if(index < 0){
                    return {value: undefined, done: true};
                } else {
                    return {value: this.#arr[index--], done: false};
                }
            } 
        }
    }
}

let stack = new Stack(10);
stack.push(20);
stack.push(30);
stack.push(40);
stack.print();