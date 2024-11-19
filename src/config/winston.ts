import winston from 'winston'

const logger = winston.createLogger({
  level: 'info', // Minimum log level for all transports
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`
    })
  ),
  transports: [
    // Console transport to log everything
    new winston.transports.Console({
      level: 'debug', // Set the console log level (logs everything)
      format: winston.format.combine(
        winston.format.colorize(), // Adds color for console
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`
        })
      ),
    }),
    // File transport to save only errors
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error', // Only log errors to the file
    }),
  ],
})

export default logger
