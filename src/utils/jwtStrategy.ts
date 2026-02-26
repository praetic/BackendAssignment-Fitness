import type { PassportStatic } from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from 'config'
import type { IConfig as IConfigMap } from '../types/config'
import type { AuthJwtPayload } from './jwt'

const accessTokenSecret = config.get(
	'jwt.accessTokenSecret'
) as IConfigMap['jwt']['accessTokenSecret']

export const registerJwtStrategy = (passport: PassportStatic) => {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: accessTokenSecret
			},
			async (payload: AuthJwtPayload, done) => {
				try {
					//todo get user from db
					return done(null, payload)
				} catch (err) {
					return done(err, false)
				}
			}
		)
	)
}
