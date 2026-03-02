import { Router, type Request, type Response, type NextFunction } from 'express'
import { validateBody } from '../middlewares/validate'
import { loginBodySchema, registerBodySchema } from '../schemas/auth'
import { loginUser, registerUser } from '../services/auth'

const router = Router()

export default () => {
	//#region login
	router.post(
		'/login',
		validateBody(loginBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { email, password } = req.body

				const data = await loginUser(email, password)

				return res.json({
					data,
					message: req.t('user_logged_in')
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	//#region register
	router.post(
		'/register',
		validateBody(registerBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { email, password, role } = req.body

				const data = await registerUser(email, password, role)

				return res.json({
					data,
					message: req.t('user_registered')
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	return router
}
