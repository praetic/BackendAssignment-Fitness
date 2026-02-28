import { Router, type Request, type Response, type NextFunction } from 'express'
import { validateBody, validateParams } from '../../middlewares/validate'
import {
	updateProgramExerciseBodySchema,
	updateProgramExerciseParamsSchema
} from '../../schemas/program'
import { updateProgramExercises } from '../../services/program'

const router = Router()

export default () => {
	//#region edit Exercises in Program
	router.patch(
		'/:programID/exercises',
		validateParams(updateProgramExerciseParamsSchema),
		validateBody(updateProgramExerciseBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { exerciseIDs } = req.body
				const programID = Number(req.params.programID)

				const data = await updateProgramExercises(programID, exerciseIDs)

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
