import { Router, type Request, type Response, type NextFunction } from 'express'
import { getUser } from '../services/user'
import { authenticateJWT } from '../middlewares/auth'

const router = Router()

export default () => {
	//#region get User
	router.get(
		'/me',
		authenticateJWT,
		async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
			const userID = req.user.id

			const data = await getUser(Number(userID))

			return res.json({
				data: {
					id: data.id,
					name: data.name,
					surename: data.surname,
					age: data.age,
					nickName: data.nickName
				},
				message: 'User data!'
			})
		}
	)
	//#endregion

	return router
}
