import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { ApiError, ErrorCode } from '../utils/ApiError'
import type { ROLE } from '../utils/enums'

export const requireRole = (role: ROLE): RequestHandler => {
	return (req: Request, _res: Response, next: NextFunction) => {
		const user = req.user

		if (!user) {
			return next(new ApiError(ErrorCode.UNAUTHORIZED, 'unauthorized'))
		}

		if (user.role !== role) {
			return next(new ApiError(ErrorCode.FORBIDDEN, 'forbidden_insufficient_role'))
		}

		next()
	}
}
