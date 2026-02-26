import { Router, type Request, type Response, type NextFunction } from 'express'
import { validateBody } from '../middlewares/validate'
import { loginBodySchema, registerBodySchema } from '../schemas/auth'
import { loginUser, registerUser } from '../services/auth'

const router = Router()

export default () => {
	router.post(
		'/login',
		validateBody(loginBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { email, password } = req.body

				const data = await loginUser(email, password)

				return res.json({
					data,
					message: 'User has logged in!'
				})
			} catch (err) {
				next(err)
			}
		}
	)

	router.post(
		'/register',
		validateBody(registerBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { email, password, role } = req.body

				const data = await registerUser(email, password, role)

				return res.json({
					data,
					message: 'User has been registered!'
				})
			} catch (err) {
				next(err)
			}
		}
	)

	return router
}
