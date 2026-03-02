import type { Config } from '../src/types/config'
import env from '../env'
import type { Options } from 'sequelize'

const databaseOptions: Options = {
	host: env.DB_HOST,
	port: env.DB_PORT,
	logging:
		env.NODE_ENV === 'development'
			? (msg: string) => {
					const logger = require('../src/utils/logger').default // lazy import
					logger.info(msg)
				}
			: false,
	dialect: 'postgres',
	pool: {
		min: 2,
		max: 2
	}
}

export default {
	env: env.NODE_ENV || 'development',
	server: {
		port: 5000
	},
	database: {
		database: env.DB_DATABASE,
		username: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		options: databaseOptions
	},
	jwt: {
		accessTokenSecret: env.ACCESS_TOKEN_SECRET,
		refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
		accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION
	}
} as const
