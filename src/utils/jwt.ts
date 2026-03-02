import config from 'config'
import type { Config } from '../types/config'
import jwt, { type SignOptions } from 'jsonwebtoken'
import type { ROLE } from './enums'

const accessTokenSecret = config.get('jwt.accessTokenSecret') as Config['jwt']['accessTokenSecret']
const accessTokenExpiry = config.get(
	'jwt.accessTokenExpiration'
) as Config['jwt']['accessTokenExpiration']

export type JwtUser = {
	id: string
	role: ROLE
}

export type AuthJwtPayload = {
	sub: string
	role: ROLE
	iat?: number
	exp?: number
}

export const signAccessToken = (user: JwtUser): Promise<string> => {
	// jwt.sign is synchronous
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ sub: user.id },
			accessTokenSecret,
			{
				expiresIn: accessTokenExpiry as SignOptions['expiresIn']
			},
			(err, token) => {
				if (err) {
					return reject(err)
				}

				if (!token) {
					return reject(new Error('Failed to generate token!'))
				}

				resolve(token)
			}
		)
	})
}
