import { z } from 'zod'

const getUserParamsSchema = z.object({
	userID: z.string().regex(/^\d+$/, 'userID must be a number')
})

const updateUserBodySchema = z.object({
	name: z.string().min(1).max(200).optional(),
	nickName: z.string().min(1).max(200).optional(),
	surname: z.string().min(1).max(200).optional(),
	age: z.string().min(1).max(200).optional()
})

type getUserParams = z.infer<typeof getUserParamsSchema>
type updateUserBody = z.infer<typeof updateUserBodySchema>

export { getUserParamsSchema, type getUserParams, updateUserBodySchema, type updateUserBody }
