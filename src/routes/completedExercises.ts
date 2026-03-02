import { Router, type Request, type Response, type NextFunction } from 'express'
import {
	getCompletedExercises,
	deleteCompletedExercise,
	createCompletedExercise
} from '../services/completedExercise'
import { validateBody, validateParams } from '../middlewares/validate'
import {
	createCompletedExerciseBodySchema,
	deleteCompletedExerciseParamsSchema
} from '../schemas/completedExercises'

const router = Router()

export default () => {
	//#region create Completed Exercise
	router.post(
		'/',
		validateBody(createCompletedExerciseBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { durationSeconds, exerciseID, completedAt } = req.body
				const userID = req.user.id

				const data = await createCompletedExercise(
					Number(durationSeconds),
					Number(exerciseID),
					userID,
					completedAt
				)

				return res.json({
					data,
					message: req.t('completed_exercise_created')
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	//#region delete Completed Exercise
	router.delete(
		'/:completedExerciseID',
		validateParams(deleteCompletedExerciseParamsSchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const completedExerciseID = Number(req.params.completedExerciseID)
				const userID = req.user.id

				const data = await deleteCompletedExercise(completedExerciseID, userID)

				return res.json({
					data,
					message: req.t('completed_exercise_deleted')
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	//#region get Completed Exercises for current user
	router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const userID = req.user.id

			const data = await getCompletedExercises(Number(userID))

			return res.json({
				data,
				message: req.t('completed_exercise_list_for_user')
			})
		} catch (err) {
			next(err)
		}
	})
	//#endregion

	return router
}
