class DArray{
    #size = 0;
    #cap_growth = 2;
    #arr = null;
    #capacity = 0;

    constructor(cap = 1){
        if(cap <= 0){
            throw new TypeError("cap must be positive");
        }
        this.#capacity = cap;
        this.#arr = new Uint32Array(cap);
    }

    resize(newcap, fill = 0){
        if(newcap < this.#size){
            throw new TypeError("can't be less than actual size");
        }
        let newarr = new Uint32Array(newcap);
        
        for (let i = 0; i < this.#size; ++i) {
            newarr[i] = this.#arr[i];
        }

        for (let i = this.#size; i < newcap; ++i) {
            newarr[i] = fill;
        }

        this.#arr = newarr;
        this.#capacity = newcap;
    }

    push_back(elem){
        if(this.#size === this.#capacity){
            this.resize(this.#capacity * this.#cap_growth);
        }

        this.#arr[this.#size++] = elem;
    }

    pop_back(){
        if(this.#size === 0){
            throw new TypeError("array is empty");
        }

        let popped = this.#arr[--this.#size];
        return popped;
    }

    set(index, val){
        if(index < 0 || index >= this.#size){
            throw new TypeError("index is out of range");
        }

        this.#arr[index] = val;
    }

    size(){
        return this.#size;
    }

    capacity(){
        return this.#capacity;
    }

    clear(){
        this.#size = 0;
    }

    insert(index, value){
        if(index < 0 || index >= this.#size){
            throw new TypeError("index is out if range");
        }

        if(this.#size === this.#capacity) {
            this.resize(this.#capacity * this.#cap_growth);
        }

        for (let i = this.#size; i > index; --i) {
            this.#arr[i] = this.#arr[i - 1];
        }

        this.#arr[index] = value;
        ++this.#size;
    }

    erase(index){
        if(index < this.#size || index >= this.#size){
            throw new TypeError("index is out of range");
        }

        for (let i = index; i < this.#size - 1; ++i) {
            this.#arr[i] = this.#arr[i + 1];
        }

        --this.#size;
    }

    back(){
        if(this.#size === 0){
            throw new TypeError("Array is empty");
        }

        return this.#arr[this.#size - 1];
    }

    front(){
        if(this.#size === 0){
            throw new TypeError("Array is empty");
        }

        return this.#arr[0];
    }

    empty(){
        return this.#size === 0;
    }

    reserve(n){
        if(n > this.#capacity){
            this.resize(n);
        }
    }

    ShrinktoFit(){
        if(this.#capacity > this.#size) {
            this.resize(this.#size);
        }
    }

    filter(callback){
        let newarr1 = new DArray();
        for (let i = 0; i < this.#size; ++i) {
            if(callback(this.#arr[i], i, this)){
                newarr1.push_back(this.#arr[i]);
            }
        }
        return newarr1;
    }

    some(callback){
        for (let i = 0; i < this.#size; ++i) {
            if(callback(this.#arr[i], i, this)){
                return true;
            }
        }
        return false;
    }

    map(callback){
        let res = new DArray();
        for (let i = 0; i < this.#size; ++i) {
            res.push_back(callback(this.#arr[i], i, this));
        }
        return res;
    }

    every(callback){
        for (let i = 0; i < this.#size; ++i) {
            if(!callback(this.#arr[i], i, this)){
                return false;
            }
        }
        return true;
    }

    reduce(callback, initialvalue){
        let acc;
        let startindex = 0;
        if(initialvalue === undefined){
            if(this.#size === 0){
                throw new Error("size === 0");
            }
            acc = this[0];
            startindex = 1;
        }
        else {
            acc = initialvalue;
        }

        for (let i = startindex; i < this.#size; ++i) {
            acc = callback(acc, this.#arr[i], i, this);
        }

        return acc;
    }

    find(callback){
        for (let i = 0; i < this.#size; ++i) {
            if(callback(this.#arr[i], i, this)){
                return this.#arr[i];
            }
        }
        return undefined;
    }

    findindex(callback){
        for (let i = 0; i < this.#size; ++i) {
            if(callback(this.#arr[i], i, this)){
                return i;
            }
        }
        return -1;
    }

    includes(val){
        for (let i = 0; i < this.#size; ++i) {
            if(this.#arr[i] === val){
                return true;
            }
        }
        return false;
    }

    toArray(){
        let res = [];
        for (let i = 0; i < this.#size; ++i) {
            res.push(this.#arr[i]);
        }
        return res;
    }

    at(index){
        if(index < 0){
            index = this.#size + index;
        }

        if(index < 0 || index >= this.#size){
            return undefined;
        }

        return this.#arr[index];
    }

    swap(i, j){
        if(i >= this.#size || i < 0 || j >= this.#size || j < 0){
            throw new Error("out of range");
        }

        let tmp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = tmp;
    }

    forEach(callback){
        for (let i = 0; i < this.#size; ++i) {
            callback(this.#arr[i], i, this);
        }
    }

    [Symbol.iterator](){
        let index = 0;
        let size = this.#size;
        let arr = this.#arr;

        return {
            next(){
                if(index < size){
                    return {value: arr[index++], done: false};
                } else {
                    return {value: undefined, done: true};
                }
            }
        }
    }

    keys(){
        let index = 0;
        let size = this.#size;

        return {
            next(){
                if(index < size){
                    return {value: index++, done: false};
                } else {
                    return {value: undefined, done: true};
                }
            },
            [Symbol.iterator](){return this}
        }
    }

    values(){
        let index = 0;
        let size = this.#size;
        let arr = this.#arr;

        return {
            next(){
                if(index < size){
                    return {value: arr[index++], done: false};
                } else {
                    return {value: undefined, done: true};
                }
            },
            [Symbol.iterator](){return this}
        }
    }

    entries(){
        let index = 0;
        let size = this.#size;
        let arr = this.#arr;

        return {
            next(){
                if(index < size){
                    return {value: [index, arr[index++]], done: false};
                } else {
                    return {value: undefined, done: true};
                }
            },
            [Symbol.iterator](){return this}
        }
    }
}

let darray = new DArray(5);
darray.push_back(10);
darray.push_back(20);
darray.push_back(30);

console.log(darray.toArray());
console.log(darray.front());
console.log(darray.back());





