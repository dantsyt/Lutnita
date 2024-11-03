const winston = require('winston')

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: {
        buildInfo: {
            nodeVersion: process.version
        }
    },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            format: winston.format.combine(
                winston.format.json()
            ),
            filename: 'combined.log'
        }),
        new winston.transports.File({
            format: winston.format.combine(
                winston.format.json()
            ),
            filename: 'error.log',
            level: 'error'
        })
    ]
})

module.exports = logger