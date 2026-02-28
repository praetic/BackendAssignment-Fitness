import { Router, type Request, type Response, type NextFunction } from 'express'
import { createExercise, deleteExercise, updateExercise } from '../../services/excercise'
import {
	createExerciseBodySchema,
	deleteExerciseParamsSchema,
	updateExerciseBodySchema,
	updateExerciseParamsSchema
} from '../../schemas/exercise'
import { validateBody, validateParams } from '../../middlewares/validate'

const router = Router()

export default () => {
	//#region create Exercise
	router.post(
		'/',
		validateBody(createExerciseBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { difficulty, name, programID } = req.body

				const data = await createExercise(difficulty, name, programID)

				return res.json({
					data,
					message: 'Exercise has been created!'
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	//#region update Exercise
	router.patch(
		'/:exerciseID',
		validateParams(updateExerciseParamsSchema),
		validateBody(updateExerciseBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const exerciseID = Number(req.params.exerciseID)
				const updateData = req.body

				const data = await updateExercise(exerciseID, updateData)

				return res.json({
					data,
					message: 'Exercise has been updated!'
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	//#region delete Exercise
	router.delete(
		'/:exerciseID',
		validateParams(deleteExerciseParamsSchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const exerciseID = Number(req.params.exerciseID)

				const data = await deleteExercise(exerciseID)

				return res.json({
					data,
					message: 'Exercise has been deleted!'
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	return router
}
