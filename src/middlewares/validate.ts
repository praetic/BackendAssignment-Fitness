import type { RequestHandler } from 'express'
import type { z, ZodType } from 'zod'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { ApiError, ErrorCode } from '../utils/ApiError'

export const validateBody =
	<TBody>(schema: ZodType<TBody>): RequestHandler<ParamsDictionary, unknown, TBody, ParsedQs> =>
	(req, _res, next) => {
		const result = schema.safeParse(req.body)

		if (!result.success) {
			throw new ApiError(ErrorCode.INVALID_BODY, 'Invalid body!', result.error.issues)
		}

		req.body = result.data
		next()
	}

export const validateQuery =
	<T extends z.ZodType<any>>(schema: { params: T }): RequestHandler =>
	(req, res, next) => {
		const result = schema.params.safeParse(req.query)

		if (!result.success) {
			throw new ApiError(ErrorCode.INVALID_QUERY, 'Invalid query!', result.error.issues)
		}

		res.locals.validatedQuery = result.data
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
				ErrorCode.INVALID_ROUTE_PARAMS,
				'Invalid route parameters!',
				result.error.issues
			)
		}

		req.params = result.data
		next()
	}
