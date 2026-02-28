import type { z } from 'zod'

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
