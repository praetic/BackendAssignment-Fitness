import type { RequestHandler } from 'express'
import type { ZodType } from 'zod'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { ApiError } from '../utils/ApiError'

export const validateBody =
	<TBody>(schema: ZodType<TBody>): RequestHandler<ParamsDictionary, unknown, TBody, ParsedQs> =>
	(req, res, next) => {
		const result = schema.safeParse(req.body)

		if (!result.success) {
			throw new ApiError(400, 'INVALID_BODY', 'Invalid body!', result.error.issues)
		}

		req.body = result.data
		next()
	}

export const validateQuery =
	<TQuery extends ParsedQs>(
		schema: ZodType<TQuery>
	): RequestHandler<ParamsDictionary, unknown, unknown, TQuery> =>
	(req, res, next) => {
		const result = schema.safeParse(req.query)

		if (!result.success) {
			res.status(400).json({
				success: false,
				error: 'Invalid query!',
				issues: result.error.issues
			})
			return
		}

		req.query = result.data as any
		next()
	}

export const validateParams =
	<TParams extends ParamsDictionary>(
		schema: ZodType<TParams>
	): RequestHandler<TParams, unknown, unknown, ParsedQs> =>
	(req, res, next) => {
		const result = schema.safeParse(req.params)

		if (!result.success) {
			res.status(400).json({
				success: false,
				error: 'Invalid route parameters!',
				issues: result.error.issues.map((issue) => ({
					path: issue.path.join('.'),
					message: issue.message,
					code: issue.code
				}))
			})
			return
		}

		req.params = result.data
		next()
	}
