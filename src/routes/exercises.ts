import { Router, type Request, type Response, type NextFunction } from 'express'
import { getExercises } from '../services/exercise'
import { validateQuery } from '../middlewares/validate'
import { type getExercisesQuery, getExercisesQuerySchema } from '../schemas/exercises'

const router = Router()

export default () => {
	//#region get Exercises
	router.get(
		'/',
		validateQuery({ params: getExercisesQuerySchema }),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const query: getExercisesQuery = res.locals.validatedQuery

				const data = await getExercises(query)

				return res.json({
					data,
					message: 'List of exercises!'
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	return router
}
