import { Router, type Request, type Response, type NextFunction } from 'express'
import { models } from '../db'

const router = Router()

const { Exercise, Program } = models

export default () => {
	//#region get Exercises
	router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const exercises = await Exercise.findAll({
				include: [
					{
						model: Program
					}
				]
			})

			return res.json({
				data: exercises,
				message: 'List of exercises!'
			})
		} catch (err) {
			next(err)
		}
	})
	//#endregion

	return router
}
