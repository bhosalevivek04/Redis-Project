// src/server.js
const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { rateLimiter } = require('./taskQueue');
const { handleTask } = require('./taskHandler');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < Math.min(2, numCPUs); i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());

    app.post('/api/v1/task', async (req, res) => {
        const userId = req.body.user_id;
        try {
            await rateLimiter.consume(userId);
            handleTask(userId);
            res.send('Task completed');
        } catch (err) {
            if (err instanceof Error && err.name === 'RateLimiterRes') {
                // Queue the task if rate limit is exceeded
                require('./taskQueue').queueTask(userId);
                res.status(429).send('Rate limit exceeded, task queued');
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    });

    app.listen(3000, () => {
        console.log(`Worker ${process.pid} started server on port 3000`);
    });
}
