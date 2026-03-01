import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
	NODE_ENV: z.union([z.literal('development'), z.literal('production')]).default('development'),
	DB_DATABASE: z.string().min(1),
	DB_PORT: z
		.string()
		.refine((val) => !Number.isNaN(Number.parseInt(val, 10)), {
			message: 'DB_PORT must be a valid number'
		})
		.transform((val) => Number.parseInt(val, 10))
		.refine((val) => val > 0, {
			message: 'DB_PORT must be greater than 0'
		}),
	DB_USERNAME: z.string().min(1),
	DB_PASSWORD: z.string().min(1),
	DB_HOST: z.string().min(1),
	ACCESS_TOKEN_SECRET: z.string().min(1),
	REFRESH_TOKEN_SECRET: z.string().min(1),
	ACCESS_TOKEN_EXPIRATION: z.string().min(2)
})

// Validate `process.env` against our schema
// and return the result
const env = envSchema.parse(process.env)

// Export the result so we can use it in the project
export default env
