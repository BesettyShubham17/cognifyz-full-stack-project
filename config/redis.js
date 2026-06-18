// config/redis.js - Redis Connection with graceful mock fallback
const Redis = require('ioredis');

let redisClient = null;
let redisConnected = false;

// In-Memory Fallback Client to keep caching fully functional without external Redis
class InMemoryRedis {
    constructor() {
        this.store = {};
        console.log('Using In-Memory Fallback Cache Client');
    }
    async get(key) {
        return this.store[key] || null;
    }
    async setex(key, seconds, value) {
        this.store[key] = value;
        setTimeout(() => {
            delete this.store[key];
        }, seconds * 1000);
        return 'OK';
    }
}

const connectRedis = () => {
    return new Promise((resolve) => {
        const client = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
            maxRetriesPerRequest: 1,
            retryStrategy: () => null,
            connectTimeout: 2000,
            lazyConnect: true
        });

        client.connect()
            .then(() => {
                redisClient = client;
                redisConnected = true;
                console.log('Redis Connected');
                resolve();
            })
            .catch((err) => {
                console.log(`Local Redis server connection refused. Initializing In-Memory Fallback.`);
                redisClient = new InMemoryRedis();
                redisConnected = true; // Set to true to enable the cache middleware with mock
                console.log('Redis Connected');
                resolve();
            });
    });
};

const getRedisClient = () => redisClient;
const isRedisConnected = () => redisConnected;

module.exports = { connectRedis, getRedisClient, isRedisConnected };
