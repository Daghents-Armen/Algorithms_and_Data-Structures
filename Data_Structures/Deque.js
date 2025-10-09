class Deque{
    #map = null;
    constructor(Initialbucket = 4, Initialblocksize = 8){
        if(Initialbucket < 2){
            throw new Error("bucket should be at least 2");
        }
        this.#map = new Array(Initialbucket).fill(null);
        this.blocksize = Initialblocksize;
        const mid = Math.floor(Initialbucket / 2);
        this.headblock = mid - 1;
        this.headindex = Initialblocksize - 1;
        this.tailblock = mid;
        this.tailindex = 0;
        this.size = 0;
    }

    pushback(value){
            if(this.tailblock >= this.#map.length) this.resize();
            
            let bucket = this.#map[this.tailblock];

            if(!bucket){
                this.#map[this.tailblock] = new Array(this.blocksize).fill(null);
            }

            this.#map[this.tailblock][this.tailindex] = value;

            if(this.tailindex === this.blocksize - 1){
                ++this.tailblock;
                this.tailindex = 0;
            } else {
                ++this.tailindex;
            }

            ++this.size;
        }

    pushfront(value){
        if(this.headblock < 0) this.resize();

        let bucket = this.#map[this.headblock];

        if(!bucket){
            this.#map[this.headblock] = new Array(this.blocksize).fill(null);
        }

        this.#map[this.headblock][this.headindex] = value;

        if(this.headindex === 0){
            --this.headblock;
            this.headindex = this.blocksize - 1;
        } else {
            --this.headindex;
        }

        ++this.size;
    }

    print(){
        for (let i = 0; i < this.#map.length; ++i) {
            let bucket = this.#map[i];

            if(!bucket) continue;

            let display = bucket.map(val => val === null ? '.' : val)
            .join(' ');
            console.log(display);
        }

    }

    resize(){
        let oldsize = this.#map.length;
        let newsize = oldsize * 2;

        let newarr = new Array(newsize).fill(null);
        let mid = Math.floor((newsize - oldsize) / 2);

        for (let i = 0; i < oldsize; ++i) {
            newarr[mid + i] = this.#map[i];
        }


        this.#map = newarr;
        this.headblock += mid;
        this.tailblock += mid;
    }

    at(index){
        if(index < 0 || index >= this.size){
            throw new Error("out of range...");
        }


    let pos = this.headblock * this.blocksize + this.headindex + index;

    let bucket = Math.floor(pos / this.blocksize);
    let idx = pos % this.blocksize;

    return this.#map[bucket][idx];
    }

    popfront(){
        if(this.size === 0){
            throw new Error("there is nothing to remove");
        }

        if(this.headindex === this.blocksize - 1){
            ++this.headblock;
            this.headindex = 0;
       } else {
            ++this.headindex;
       }

       let value = this.#map[this.headblock][this.headindex];
       this.#map[this.headblock][this.headindex] = null;
       --this.size;
       
       return value;
    }

    popback(){
        if(this.size === 0){
            throw new Error("there is nothing to remove");
        }

        if(this.tailindex === 0){
            --this.tailblock;
            this.tailindex = this.blocksize - 1;
        } else {
            --this.tailindex;
        }
        
        let value = this.#map[this.tailblock][this.tailindex];
        this.#map[this.tailblock][this.tailindex] = null;
        --this.size;

        return value;
    }
}

let dq = new Deque();

for (let i = 0; i < 16; ++i) {
    dq.pushfront(i + 1);
    dq.pushback(i + 1)
}

dq.print()
