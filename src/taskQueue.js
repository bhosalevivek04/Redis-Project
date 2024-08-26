const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const { handleTask } = require('./taskHandler');

const redisClient = new Redis();

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rate_limit',
    points: 20, // 20 tasks
    duration: 60, // per minute
    blockDuration: 1, // Block for 1 second after 1 task per second
});

const queueTask = async (userId) => {
    await redisClient.lpush(`task_queue_${userId}`, userId);
    processQueue(userId);
};

const processQueue = async (userId) => {
    const task = await redisClient.rpop(`task_queue_${userId}`);
    if (task) {
        setTimeout(() => {
            handleTask(task);
            processQueue(userId);
        }, 1000); // Process 1 task per second
    }
};

module.exports = { rateLimiter, queueTask };
