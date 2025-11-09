class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  #head = null;
  #tail = null;
  #size = 0;
  #MAGIC_ZERO = 0;
  
  constructor(iterables) {
    if(iterables === undefined) return;

    if(iterables && typeof iterables[Symbol.iterator] !== 'function'){
        iterables = new Array(iterables);
    }

    for (let item of iterables) {
        this.push_back(item);
    }
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === this.#MAGIC_ZERO;
  }

  clear() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  push_front(value) {
    let node = new Node(value);

    if(!this.#size){
      this.#head = node;
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head.prev = node;
      this.#head = node;
    }
    ++this.#size;
  }

  push_back(value) {
    let node = new Node(value);

    if(!this.#size){
      this.#head = node;
      this.#tail = node;
    } else {
      node.prev = this.#tail;
      this.#tail.next = node;
      this.#tail = node;
    }
    ++this.#size;
  }

  pop_front() {
    let val = this.#head.data;

    if(this.#size < 2){
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }
    --this.#size;
      return val;
  }

  pop_back() {
    let val = this.#tail.data;

    if(this.#size < 2){
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }
    --this.#size;
    return val;
  }

  front() {
    if(!this.#size)return null;

    return this.#head.data;
  }

  back() {
    if(!this.#size)return null;

    return this.#tail.data;
  }

  at(index) {
    if(!this.#size)return null;

    if(index < 0 || index >= this.#size){
      return null;
    }

    let count = 0;
    let current = this.#head;
    while(current){
      if(count === index){
        return current.data;
      }
      current = current.next;
      ++count;
    }
    return null;
  }

  insert(index, value) {
    if(index < 0 || index > this.#size){
      return null;
    }

    let node = new Node(value);
    if(!this.#size){
      this.#head = node;
      this.#tail = node;
      ++this.#size;
      return;
    } 

    if(index === 0){
      node.next = this.#head;
      this.#head.prev = node;
      this.#head = node;
      ++this.#size;
      return;
    }

    if(index === this.#size){
      node.prev = this.#tail;
      this.#tail.next = node;
      this.#tail = node;
      ++this.#size;
      return;
    }

    let count = 0;
    let current = this.#head;

    while(current){
      if(count === index){
        node.prev = current.prev;
        node.next = current;
        current.prev.next = node;
        current.prev = node;
        ++this.#size;
        return;
      }
      current = current.next;
      ++count;
    }
  }

  erase(index) {
    if(!this.#size)return null;

    if(index < 0 || index >= this.#size){
      return null;
    }

    if(index === 0){
      let val = this.#head.data;
      this.#head = this.#head.next;
      this.#head.prev = null;
      --this.#size;
      return val;
    }

    if(index === this.#size - 1){
      let val = this.#tail.data;
      if(this.#size === 1){
        this.#head = null;
        this.#tail = null;
      } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
      }
      --this.#size;
      return val;
    }

    let count = 0;
    let current = this.#head;
    while(current){
      if(count === index){
        let val = current.data;
        current.prev.next = current.next;
        current.next.prev = current.prev;
        --this.#size
        return val;
      }
      ++count;
      current = current.next;
    }

  }

  remove(value, equals = Object.is) {
    if(!this.#size)return null;

    if(this.#size === 1 && this.#head.data === value){
      let val = this.#head.data;
      this.#head = null;
      this.#tail = null;
      --this.#size;
      return val;
    }

    if(this.#tail.data === value){
      let val = this.#tail.data;
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
      --this.#size;
      return val;
    }

    let current = this.#head.next;

    while(current){
      if(current.data === value){
        let val = current.data;
        current.prev.next = current.next;
        current.next.prev = current.prev;
        --this.#size;
        return val;
      }
      current = current.next;
    }
    return null;
  }

  reverse() {
    if(!this.#size)return null;

    if(this.#size === 1){
      return;
    }

    let tmp = null;
    let current = this.#head;

    while(current){
      tmp = current.prev;
      current.prev = current.next;
      current.next = tmp;
      current = current.prev;
    }

    if(tmp){
        [this.#head, this.#tail] = [this.#tail, this.#head];
      }
    
  }

  merge(left, right){
    if(!left)return right;
    if(!right)return left;

    let dummy = new Node(null);

    let current = dummy;

    while(left && right){
      if(left.data < right.data){
        current.next = left;
        left.prev = current;
        left = left.next;
      } else {
        current.next = right;
        right.prev = current;
        right = right.next;
      }
      current = current.next;
    }

    if(left){
      current.next = left;
      left.prev = current;
    } 

    if(right){
      current.next = right;
      right.prev = current;
    }

    return dummy.next;
  }

  merge_sort(head){
    if(!head || !head.next){
      return head;
    }

    let fast = head.next;
    let slow = head;

    while(fast && fast.next){
      fast = fast.next.next;
      slow = slow.next;
    }

    let mid = slow.next;
    slow.next = null;
    if(mid) mid.prev = null;

    let left = this.merge_sort(head);
    let right = this.merge_sort(mid);

    return this.merge(left, right);
  }

  print(){
    if(!this.#head) return null;

    let str = '';
    let current = this.#head;
    while(current){
      str += current.data + '->';
      current = current.next;
    }
    str += null;
    console.log(str);
  }
}


let list = new DoublyLinkedList();

for (let i = 0; i < 20; ++i) {
  let num = Math.floor(Math.random() * 20) + 1;
  list.push_back(num);
}

list.print()
