const winston = require('winston');

const logObj = winston.createLogger({
  levels: winston.config.npm.levels,
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = {log: logObj};