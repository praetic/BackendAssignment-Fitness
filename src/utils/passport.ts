import passport from 'passport'
import { registerJwtStrategy } from './jwtStrategy'

export const initPassport = () => {
	registerJwtStrategy(passport)

	return passport
}
