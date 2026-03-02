import passport from 'passport'
import type { Request, Response, NextFunction } from 'express'
import { ApiError, ErrorCode } from '../utils/ApiError'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('jwt', { session: false }, (err: unknown, user: Express.User | false) => {
		if (err) {
			return next(err)
		}

		if (!user) {
			throw new ApiError(ErrorCode.UNAUTHORIZED, 'unauthorized')
		}

		req.user = user
		next()
	})(req, res, next)
}
