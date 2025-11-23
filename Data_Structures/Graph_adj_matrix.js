class Graph{
    constructor(size, isDirected = false){
        this.size = size;
        this.isDirected = isDirected;
        this.matrix = Array.from({length: this.size}, () => new Array(this.size).fill(0));
    }

    addEdge(u, v){
        this.matrix[u][v] = 1;
        if(!this.isDirected){
            this.matrix[v][u] = 1;
        }
    }

    bfs(start){
        const result = new Array(this.size);
        const isVisited = new Array(this.size).fill(false);
        const queue = new Queue();
        let idx = 0;
        queue.enque(start);
        isVisited[start] = true;

        while(!queue.isEmpty()){
            let node = queue.deque();
            result[idx++] = node;
            for (let i = 0; i < this.size; ++i){
                if(this.matrix[node][i] === 1 && !isVisited[i]){
                    queue.enque(i);
                    isVisited[i] = true;
                }
            }
        }
        return result;
    }

    dfs(start){
        const result = new Array(this.size);
        const stack = new Stack();
        const isVisited = new Array(this.size).fill(false);
        let idx = 0;
        isVisited[start] = true;
        stack.push(start);

        while(stack.size()){
            let node = stack.pop();
            result[idx++] = node;
        
            for (let i = 0; i < this.size; ++i){
                if(this.matrix[node][i] === 1 && !isVisited[i]){
                    stack.push(i);
                    isVisited[i] = true;
                }
            }
        }
        return result;
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
}

class Stack{
    #top = -1;
    #size = 0;
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

    size(){
        return this.#size;
    }
}

let graph = new Graph(8);
graph.addEdge(1,5);
graph.addEdge(1,4);
graph.addEdge(1,2);
graph.addEdge(5,1);
graph.addEdge(4,1);
graph.addEdge(2,6);
graph.addEdge(2,7);
graph.addEdge(2,3);
graph.addEdge(6,2);
graph.addEdge(7,2);
graph.addEdge(2,3);
graph.addEdge(3,2);
console.log(graph.bfs(1));
console.log(graph.dfs(1));

