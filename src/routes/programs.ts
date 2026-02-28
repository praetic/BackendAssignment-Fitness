import { Router, type Request, type Response, type NextFunction } from 'express'
import { models } from '../db'
import { authenticateJWT } from '../middlewares/auth'

const router = Router()

const { Program } = models

export default () => {
	//#region get Programs
	router.get(
		'/',
		authenticateJWT,
		async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const programs = await Program.findAll()

				return res.json({
					data: programs,
					message: 'List of programs!'
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	return router
}
