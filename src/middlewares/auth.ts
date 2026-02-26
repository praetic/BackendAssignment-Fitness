import passport from 'passport'
import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('jwt', { session: false }, (err: unknown, user: Express.User | false) => {
		if (err) {
			return next(err)
		}

		if (!user) {
			throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required!')
		}

		req.user = user
		next()
	})(req, res, next)
}
