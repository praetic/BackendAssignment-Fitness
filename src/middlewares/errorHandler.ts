import type { ErrorRequestHandler } from 'express'
import { ApiError } from '../utils/ApiError'
import logger from '../utils/logger'

export const errorHandler: ErrorRequestHandler = (err, req, res, _next): void => {
	if (err instanceof ApiError) {
		const translation = req.t(err.message)

		logger.error(translation)

		res.status(err.statusCode).json({
			error: {
				code: err.code,
				message: translation,
				...(err.issues && { issues: err.issues }) // attach issues if exist
			}
		})

		return
	}

	logger.error(err.message)

	res.status(500).json({
		error: {
			code: 'INTERNAL_SERVER_ERROR',
			message: req.t('internal_error')
		}
	})
}
