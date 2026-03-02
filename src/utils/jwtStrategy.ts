import type { PassportStatic } from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from 'config'
import type { Config } from '../types/config'
import type { AuthJwtPayload } from './jwt'
import { models } from '../db'

const { User } = models

const accessTokenSecret = config.get('jwt.accessTokenSecret') as Config['jwt']['accessTokenSecret']

export const registerJwtStrategy = (passport: PassportStatic) => {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: accessTokenSecret
			},
			async (payload: AuthJwtPayload, done) => {
				try {
					const user = await User.findByPk(Number(payload.sub))

					if (!user) {
						return done(null, false)
					}

					return done(null, { id: user.id, role: user.role })
				} catch (err) {
					return done(err, false)
				}
			}
		)
	)
}
