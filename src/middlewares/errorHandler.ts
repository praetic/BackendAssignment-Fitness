import type { ErrorRequestHandler } from 'express'
import { ApiError } from '../utils/ApiError'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next): void => {
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

	console.error(err)

	res.status(500).json({
		error: {
			code: 'INTERNAL_SERVER_ERROR',
			message: 'Something went wrong'
		}
	})
}
