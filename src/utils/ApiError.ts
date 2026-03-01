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
export class ApiError extends Error {
	statusCode: number
	code: string
	issues?: z.core.$ZodIssue[]

	constructor(statusCode: number, code: string, message: string, issues?: z.core.$ZodIssue[]) {
		super(message)
		this.statusCode = statusCode
		this.code = code

		if (issues) {
			this.issues = issues
		}

		Object.setPrototypeOf(this, ApiError.prototype)
	}
}
