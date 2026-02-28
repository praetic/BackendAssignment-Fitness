import { z } from 'zod'

const getUserParamsSchema = z.object({
	userID: z.string().regex(/^\d+$/, 'userID must be a number')
})

type getUserParams = z.infer<typeof getUserParamsSchema>

export { getUserParamsSchema, type getUserParams }
