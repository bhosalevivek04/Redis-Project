const fs = require('fs');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/task_log.txt' })
    ]
});

const handleTask = (userId) => {
    const logMessage = `${userId} - task completed at - ${new Date().toISOString()}`;
    console.log(logMessage);
    fs.appendFileSync('logs/task_log.txt', `${logMessage}\n`);
    logger.info(logMessage);
};

module.exports = { handleTask };
