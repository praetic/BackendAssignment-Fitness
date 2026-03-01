import { Router, type Request, type Response, type NextFunction } from 'express'
import { getExercises } from '../services/exercise'

const router = Router()

export default () => {
	//#region get Exercises
	router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const data = await getExercises()

			return res.json({
				data,
				message: 'List of exercises!'
			})
		} catch (err) {
			next(err)
		}
	})
	//#endregion

	return router
}
