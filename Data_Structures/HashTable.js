class HashTable{
    constructor(initial_capacity = 11, maxfactor = 1.0){
        if(!this.is_prime(initial_capacity)){
            initial_capacity = this.next_prime(initial_capacity);
        }

        if(maxfactor <= 0.3) maxfactor = 1.0;
        this.max_load_factor = maxfactor;
        this.bucket_count = initial_capacity;
        this.size = 0;
        this.buckets = new Array(this.bucket_count).fill(null).map(() => []);
    }

    is_prime(n){
        if(n <= 2) return false;
        if(n % 2 === 0) return false;

        for (let i = 3; i * i <= n; i += 2){
            if(n % i === 0) return false;
        }
        return true;
    }

    next_prime(n){
        ++n;
        while(!this.is_prime(n)) ++n;
        return n;
    }

    load_factor(){
        return this.size / this.bucket_count;
    }

    hash_key(key){
        return key % this.bucket_count;
    }

    hash_strings(str){
        let num = 131;
        let exp = 2 ** 53 - 1;
        let hash = 0;

        for (let i = 0; i < str.length; ++i){
            hash = (hash * num + str.charCodeAt(i)) % exp;
        }

        return hash;
    }

    set(key, value){
        let index = this.hash_key(key);
        let bucket = this.buckets[index];

        for (let pair of bucket){
            if(pair.key === key){
                pair.value = value;
                return;
            }
        }

        bucket.push({key, value});
        ++this.size;

        if(this.load_factor() > this.max_load_factor){
            this.rehash();
        }
    }

    rehash(){
        let old_table = this.buckets;
        this.bucket_count = this.next_prime(this.bucket_count * 2);
        this.buckets = new Array(this.bucket_count).fill(null).map(() => []);
        this.size = 0;
        
        for (let bucket of old_table){
            for (let pair of bucket){
                this.set(pair.key, pair.value);
            }
        }   
    }

    has(key){
        let index = this.hash_key(key);
        let bucket = this.buckets[index];

        for (let pair of bucket){
            if(pair.key === key) return true;
        }

        return false;
    }

    get(key){
        let index = this.hash_key(key);
        let bucket = this.buckets[index];

        for (let pair of bucket){
            if(pair.key === key){
                return pair.value;
            }
        }

        return undefined;
    }

    delete(key){
        let index = this.hash_key(key);
        let bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; ++i){
            if(bucket[i].key === key){
                let removed = bucket.splice(i, 1)[0];
                --this.size;
                return removed.value;
            }
        }

        return undefined;
    }

    *[Symbol.iterator](){
        for (let bucket of this.buckets){
            for (let {key, value} of bucket){
                yield [key, value];
            }
        }
    }
}

let ht = new HashTable(14);
ht.set(1, 'one');
ht.set(1, 'two');
ht.set(2, 'two');
ht.set(4, 'four');
ht.set(8, 'eight');
ht.set(5, 'five');
ht.set(6, 'six');
ht.set(7, 'seven');
console.log(ht);
console.log(ht.get(1));


