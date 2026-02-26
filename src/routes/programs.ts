import { Router, type Request, type Response, type NextFunction } from 'express'

import { models } from '../db'
import { authenticateJWT } from '../middlewares/auth'

const router = Router()

const { Program } = models

export default () => {
	router.get(
		'/',
		authenticateJWT,
		async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
			const programs = await Program.findAll()

			return res.json({
				data: programs,
				message: 'List of programs'
			})
		}
	)

	return router
}
