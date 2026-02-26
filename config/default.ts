import type { IConfig } from '../src/types/config'
/* import logger from '../src/utils/logger' */
import env from '../env'

export default {
	env: env.NODE_ENV || 'development',
	server: {
		port: 5000
	},
	database: {
		database: env.DB_DATABASE,
		username: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		options: {
			host: env.DB_HOST,
			port: env.DB_PORT,
			/* logging:
				env.NODE_ENV === 'development'
					? (e: string) => {
							logger.info(e)
						}
					: false, */
			dialect: 'postgres',
			pool: {
				min: 2,
				max: 2
			}
		}
	},
	jwt: {
		accessTokenSecret: env.ACCESS_TOKEN_SECRET,
		refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
		accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION,
		refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION
	}
} satisfies IConfig
