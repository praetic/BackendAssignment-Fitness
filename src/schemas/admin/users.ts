import { z } from 'zod'
import { ROLE } from '../../utils/enums'

const getAdminUserParamsSchema = z.object({
	userID: z.string().regex(/^\d+$/, 'userID must be a number')
})

const patchAdminUserParamsSchema = z.object({
	userID: z.string().regex(/^\d+$/, 'userID must be a number')
})

const patchAdminUserBodySchema = z.object({
	name: z.string().min(1).max(200).optional(),
	surname: z.string().min(1).max(200).optional(),
	nickName: z.string().min(1).max(200).optional(),
	age: z.number().min(1).optional(),
	role: z.enum(ROLE).optional()
})

type getAdminUserParams = z.infer<typeof getAdminUserParamsSchema>
type patchAdminUserParams = z.infer<typeof patchAdminUserParamsSchema>
type patchAdminUserBody = z.infer<typeof patchAdminUserBodySchema>

export {
	getAdminUserParamsSchema,
	type getAdminUserParams,
	patchAdminUserParamsSchema,
	type patchAdminUserParams,
	patchAdminUserBodySchema,
	type patchAdminUserBody
}
