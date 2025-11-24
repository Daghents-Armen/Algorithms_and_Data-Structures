class Graph{
    constructor(size, isDirected = false){
        this.size = size;
        this.isDirected = isDirected;
        this.list = Array.from({length: size}, () => []);
    }

    addEdge(u, v){
        this.list[u].push(v);
        if(!this.isDirected){
            this.list[v].push(u);
        }
    }

    bfs(start){
        const result = [];
        const isVisited = new Array(this.size).fill(false);
        const queue = new Queue();
        isVisited[start] = true;
        queue.enque(start);

        while(!queue.isEmpty()){
            let node = queue.deque();
            result.push(node);

            const neighbours = this.list[node];
            for (let i = 0; i < neighbours.length; ++i){
                let neighbour = neighbours[i];

                if(!isVisited[neighbour]){
                    queue.enque(neighbour);
                    isVisited[neighbour] = true;
                }
            }
        }
        return result;
    }


    dfs(start){
        const result = [];
        const isVisited = new Array(this.size).fill(false);
        const stack = new Stack();
        stack.push(start);
        isVisited[start] = true;

        while(stack.size()){
            let node = stack.pop();
            result.push(node);
            const neighbours = this.list[node];

            for (let i = 0; i < neighbours.length; ++i){
                let neighbour = neighbours[i];

                if(!isVisited[neighbour]){
                    isVisited[neighbour] = true;
                    stack.push(neighbour);
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

let graph = new Graph(6);
graph.addEdge(1,2);
graph.addEdge(2,4);
graph.addEdge(1,4);
graph.addEdge(2,5);

console.log(graph.bfs(1));
console.log(graph.dfs(1));