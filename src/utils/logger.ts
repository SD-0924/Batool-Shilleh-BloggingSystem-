import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
})

export const logError = (message: string) => {
  logger.error(message)
}

export const logInfo = (message: string) => {
  logger.info(message)
}
