import { Router, type Request, type Response, type NextFunction } from 'express'
import { getPrograms } from '../services/program'

const router = Router()

export default () => {
	//#region get Programs
	router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const programs = await getPrograms()

			return res.json({
				data: programs,
				message: req.t('program_list')
			})
		} catch (err) {
			next(err)
		}
	})
	//#endregion

	return router
}
