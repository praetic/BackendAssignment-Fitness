import { z } from 'zod'
import { EXERCISE_DIFFICULTY } from '../utils/enums'

const createExerciseBodySchema = z.object({
	difficulty: z.enum(EXERCISE_DIFFICULTY),
	name: z.string().min(1),
	programID: z.number()
})

const updateExerciseParamsSchema = z.object({
	exerciseID: z.string().regex(/^\d+$/, 'exerciseID must be a number')
})

const deleteExerciseParamsSchema = updateExerciseParamsSchema

const updateExerciseBodySchema = z.object({
	name: z.string().min(1).optional(),
	difficulty: z.enum(EXERCISE_DIFFICULTY).optional(),
	programID: z.number().optional()
})

type createExerciseBody = z.infer<typeof createExerciseBodySchema>
type updateExerciseBody = z.infer<typeof updateExerciseBodySchema>
type updateExerciseParams = z.infer<typeof updateExerciseParamsSchema>
type deleteExerciseParams = z.infer<typeof deleteExerciseParamsSchema>

export {
	createExerciseBodySchema,
	type createExerciseBody,
	updateExerciseBodySchema,
	type updateExerciseBody,
	updateExerciseParamsSchema,
	type updateExerciseParams,
	deleteExerciseParamsSchema,
	type deleteExerciseParams
}
