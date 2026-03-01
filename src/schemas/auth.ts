import { z } from 'zod'
import { ROLE } from '../utils/enums'

const registerBodySchema = z.object({
	email: z.email({ message: 'Invalid email format!' }).max(200),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long' })
		.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
		.regex(/[0-9]/, { message: 'Password must contain at least one number' }),
	role: z.enum(ROLE)
})

const loginBodySchema = z.object({
	email: z.email({ message: 'Invalid email format!' }).max(200),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long' })
		.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
		.regex(/[0-9]/, { message: 'Password must contain at least one number' })
})

type registerBody = z.infer<typeof registerBodySchema>
type loginBody = z.infer<typeof loginBodySchema>

export { registerBodySchema, type registerBody, loginBodySchema, type loginBody }
