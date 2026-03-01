import { z } from 'zod'

const deleteCompletedExerciseParamsSchema = z.object({
	completedExerciseID: z.string().regex(/^\d+$/, 'completedExerciseID must be a number')
})

const createCompletedExerciseBodySchema = z.object({
	durationSeconds: z.number().min(1),
	exerciseID: z.number().min(1),
	completedAt: z.coerce.date()
})

type deleteCompletedExerciseParams = z.infer<typeof deleteCompletedExerciseParamsSchema>
type createCompletedExerciseBody = z.infer<typeof createCompletedExerciseBodySchema>

export {
	deleteCompletedExerciseParamsSchema,
	type deleteCompletedExerciseParams,
	createCompletedExerciseBodySchema,
	type createCompletedExerciseBody
}
