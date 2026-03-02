import type { Options } from 'sequelize'

export interface Config {
	env: string
	server: {
		port: number
	}
	database: {
		database: string
		username: string
		password: string
		options: Options
	}
	jwt: {
		accessTokenSecret: string
		refreshTokenSecret: string
		accessTokenExpiration: string
	}
}
