// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Set default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/test.log' }) // Log to a file
    ],
});

module.exports = logger;