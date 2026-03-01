import { Router, type Request, type Response, type NextFunction } from 'express'
import { validateBody, validateParams } from '../../middlewares/validate'
import {
	updateAdminProgramExerciseBodySchema,
	updateAdminProgramExerciseParamsSchema
} from '../../schemas/admin/programs'
import { updateAdminProgramExercises } from '../../services/admin/program'

const router = Router()

export default () => {
	//#region edit Exercises in Program
	router.patch(
		'/:programID/exercises',
		validateParams(updateAdminProgramExerciseParamsSchema),
		validateBody(updateAdminProgramExerciseBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { exerciseIDs } = req.body
				const programID = Number(req.params.programID)

				const data = await updateAdminProgramExercises(programID, exerciseIDs)

				return res.json({
					data,
					message: 'List of exercises has been updated!'
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	return router
}
