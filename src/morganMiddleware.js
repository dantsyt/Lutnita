const morgan = require('morgan')
const logger = require('./logger')
const requestIp = require('request-ip')

morgan.token('remote-addr', function (req, res) {
    let ffHeaderValue = req.headers['x-real-ip'];
    return ffHeaderValue || req.socket.remoteAddress;
});

morgan.token('trueIp', req => requestIp.getClientIp(req));

const morganFormat = `{
    "@timestamp": ":date[iso]",
    "headerIp": ":remote-addr",
    "originalsourceip": ":trueIp",
    "user": ":remote-user",
    "httpVersion": "HTTP/:http-version",
    "referrer": ":referrer",
    "userAgent": ":user-agent",
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