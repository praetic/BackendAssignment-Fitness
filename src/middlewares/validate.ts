import type { RequestHandler } from 'express'
import type { ZodType } from 'zod'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { ApiError } from '../utils/ApiError'

export const validateBody =
	<TBody>(schema: ZodType<TBody>): RequestHandler<ParamsDictionary, unknown, TBody, ParsedQs> =>
	(req, _res, next) => {
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
	(req, _res, next) => {
		const result = schema.safeParse(req.query)

		if (!result.success) {
			throw new ApiError(400, 'INVALID_QUERY', 'Invalid query!', result.error.issues)
		}

		req.query = result.data
		next()
	}

export const validateParams =
	<TParams extends ParamsDictionary>(
		schema: ZodType<TParams>
	): RequestHandler<TParams, unknown, unknown, ParsedQs> =>
	(req, _res, next) => {
		const result = schema.safeParse(req.params)

		if (!result.success) {
			throw new ApiError(
				400,
				'INVALID_ROUTE_PARAMS',
				'Invalid route parameters!',
				result.error.issues
			)
		}

		req.params = result.data
		next()
	}
