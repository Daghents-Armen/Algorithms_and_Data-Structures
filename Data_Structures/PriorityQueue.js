class PriorityQueue{
    #heap = [];
    #compare;

    constructor(compareFn = (a, b) => a - b){
        this.#compare = compareFn;
    }

    parent(i){
        return Math.floor((i - 1) / 2);
    }

    left(i){
        return (2 * i) + 1;
    }

    right(i){
        return (2 * i) + 2;
    }

    swap(i, j){
        [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
    }

    heapifyUp(i){
        while(i > 0){
            let parent = this.parent(i);
            if(this.#compare(this.#heap[i], this.#heap[parent]) < 0){
                this.swap(i, parent);
                i = parent;
            } else {
                break;
            }
        }
    }

    heapifyDown(i){
         let n = this.#heap.length;

    while (true) {
      let left = this.left(i);
      let right = this.right(i);

      let smallest = i;

      if (left < n && this.#compare(this.#heap[left], this.#heap[smallest]) < 0) smallest = left;
      if (right < n && this.#compare(this.#heap[right], this.#heap[smallest]) < 0) smallest = right;

      console.log('smallest: ', smallest);
      if (i != smallest) {
        this.swap(i, smallest)
        i = smallest;
      } else {
        break;
      }
    }
  }

  size() {
    return this.#heap.length;
  }

  empty() {
    return this.#heap.length === 0;
  }

  push(elem) {
    this.#heap.push(elem);

    this.heapifyUp(this.#heap.length - 1);
  }

  peek(){
    return this.#heap[0];
  }

  pop(){
    if(this.empty()){
        throw new Error("is empty");
    }

    let root = this.#heap[0];
    let last = this.#heap.pop();

    if(!this.empty()){
        this.#heap[0] = last;
        this.heapifyDown(0);
    }

    return root;
  }

  print(){
    console.log(this.#heap);
  }
}

let heap = new PriorityQueue();
heap.push(6);
heap.push(9);
heap.push(10);
heap.print();