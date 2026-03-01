import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { ApiError, ErrorCode } from '../utils/ApiError'
import type { ROLE } from '../utils/enums'

export const requireRole = (role: ROLE): RequestHandler => {
	return (req: Request, _res: Response, next: NextFunction) => {
		const user = req.user

		if (!user) {
			return next(new ApiError(401, ErrorCode.UNAUTHORIZED, 'Authentication required!'))
		}

		if (user.role !== role) {
			return next(new ApiError(403, ErrorCode.FORBIDDEN, `User must have role: ${role}`))
		}

		next()
	}
}
