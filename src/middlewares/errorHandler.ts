import type { ErrorRequestHandler } from 'express'
import { ApiError } from '../utils/ApiError'
import logger from '../utils/logger'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next): void => {
	logger.error(err.message)

	if (err instanceof ApiError) {
		res.status(err.statusCode).json({
			error: {
				code: err.code,
				message: err.message,
				...(err.issues && { issues: err.issues }) // attach issues if exist
			}
		})

		return
	}

	res.status(500).json({
		error: {
			code: 'INTERNAL_SERVER_ERROR',
			message: 'Something went wrong'
		}
	})
}
