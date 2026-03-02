import type { z } from 'zod'

export enum ErrorCode {
	UNAUTHORIZED = 'UNAUTHORIZED',
	CONFLICT = 'CONFLICT',
	FORBIDDEN = 'FORBIDDEN',
	NOT_FOUND = 'NOT_FOUND',
	INVALID_QUERY = 'INVALID_QUERY',
	INVALID_BODY = 'INVALID_BODY',
	INTERNAL_ERROR = 'INTERNAL_ERROR',
	INVALID_ROUTE_PARAMS = 'INVALID_ROUTE_PARAMS',
	EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	EMPTY_BODY = 'EMPTY_BODY'
}

const errorCodeToStatus: Record<ErrorCode, number> = {
	[ErrorCode.UNAUTHORIZED]: 401,
	[ErrorCode.FORBIDDEN]: 403,
	[ErrorCode.NOT_FOUND]: 404,
	[ErrorCode.CONFLICT]: 409,
	[ErrorCode.INVALID_QUERY]: 400,
	[ErrorCode.INVALID_BODY]: 400,
	[ErrorCode.INVALID_ROUTE_PARAMS]: 400,
	[ErrorCode.EMPTY_BODY]: 400,
	[ErrorCode.EMAIL_ALREADY_EXISTS]: 409,
	[ErrorCode.INVALID_CREDENTIALS]: 401,
	[ErrorCode.INTERNAL_ERROR]: 500
}
export class ApiError extends Error {
	statusCode: number
	code: string
	issues?: z.core.$ZodIssue[]

	// message -> translation key from locales
	constructor(code: ErrorCode, message: string, issues?: z.core.$ZodIssue[]) {
		super(message)
		this.statusCode = errorCodeToStatus[code] ?? 500
		this.code = code

		if (issues) {
			this.issues = issues
		}

		Object.setPrototypeOf(this, ApiError.prototype)
	}
}
