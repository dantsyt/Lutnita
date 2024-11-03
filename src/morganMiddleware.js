const morgan = require('morgan')
const logger = require('./logger')

const morganFormat = `{
    "@timestamp": ":date[iso]",
    "morganIp": ":remote-addr",
    "user": ":remote-user",
    "httpVersion": "HTTP/:http-version",
    "referrer": ":referrer",
    "userAgent": ":user-agent",
    "headers": "res()",
    "method": ":method",
    "requestPath": ":url",
    "status": ":status",
    "responseTime": ":response-time"
}`

function messageHandler(message) {
    logger.info('', JSON.parse(message.trim()))
}

/* messageHandler(message) = () => {
    logger.info('Request received', JSON.parse(message.trim()))
} */

const morganMiddleware = morgan(
    morganFormat,
    {
        stream: {
            write: messageHandler
        }
    }
)

module.exports = morganMiddleware