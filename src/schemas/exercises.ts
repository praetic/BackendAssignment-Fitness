import { z } from 'zod'

const getExercisesQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).optional(),
	programID: z.coerce.number().min(1).optional(),
	search: z.string().min(1).optional()
})

type getExercisesQuery = z.infer<typeof getExercisesQuerySchema>

export { getExercisesQuerySchema, type getExercisesQuery }
