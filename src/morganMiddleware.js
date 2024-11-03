const morgan = require('morgan')
const logger = require('./logger')
const requestIp = require('request-ip')

morgan.token('header-ip', function (req, res) {
    const ffHeaderValue = req.headers['x-real-ip']
    return ffHeaderValue || req.socket.remoteAddress
})

morgan.token('trueIp', req => requestIp.getClientIp(req))

const morganFormat = `{
    "@timestamp": ":date[iso]",
    "headerIp": ":header-ip",
    "originalsourceip": ":trueIp",
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

const morganMiddleware = morgan(
    morganFormat,
    {
        stream: {
            write: messageHandler
        }
    }
)

module.exports = morganMiddleware