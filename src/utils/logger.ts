import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import config from 'config'
import type { Config } from '../types/config'

const ENV = config.get('env') as Config['env']

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level.toUpperCase()}: ${message}`
		})
	),
	transports: [
		// log rotation for error levels
		new DailyRotateFile({
			filename: 'logs/error-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			maxFiles: '30d', // keep for 30 days
			level: 'error'
		}),

		// log rotation for combined levels
		new DailyRotateFile({
			filename: 'logs/combined-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			maxFiles: '30d' // keep for 30 days
		})
	]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (ENV === 'development') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				winston.format.printf(({ timestamp, level, message }) => {
					return `[${timestamp}] ${level}: ${message}`
				})
			)
		})
	)
}

export default logger
