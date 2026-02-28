import { z } from 'zod'

const updateProgramExerciseBodySchema = z.object({
	exerciseIDs: z.array(z.number())
})

const updateProgramExerciseParamsSchema = z.object({
	programID: z.string().regex(/^\d+$/, 'programID must be a number')
})

type updateProgramExerciseBody = z.infer<typeof updateProgramExerciseBodySchema>
type updateProgramExerciseParams = z.infer<typeof updateProgramExerciseParamsSchema>

export {
	updateProgramExerciseBodySchema,
	type updateProgramExerciseBody,
	updateProgramExerciseParamsSchema,
	type updateProgramExerciseParams
}
