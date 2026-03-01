import { z } from 'zod'

const updateAdminProgramExerciseBodySchema = z.object({
	exerciseIDs: z.array(z.number())
})

const updateAdminProgramExerciseParamsSchema = z.object({
	programID: z.string().regex(/^\d+$/, 'programID must be a number')
})

type updateAdminProgramExerciseBody = z.infer<typeof updateAdminProgramExerciseBodySchema>
type updateAdminProgramExerciseParams = z.infer<typeof updateAdminProgramExerciseParamsSchema>

export {
	updateAdminProgramExerciseBodySchema,
	type updateAdminProgramExerciseBody,
	updateAdminProgramExerciseParamsSchema,
	type updateAdminProgramExerciseParams
}
