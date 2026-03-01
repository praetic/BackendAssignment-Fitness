import { Router, type Request, type Response, type NextFunction } from 'express'
import { getUser, getUsers, updateUser } from '../services/user'

const router = Router()

export default () => {
	//#region get Users
	router.get('/', async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		const data = await getUsers()

		return res.json({
			data,
			message: 'List of users!'
		})
	})
	//#endregion

	//#region get User
	router.get('/me', async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		const userID = req.user.id

		const data = await getUser(Number(userID))

		return res.json({
			data,
			message: 'User data!'
		})
	})
	//#endregion

	//#region update User
	router.patch('/me', async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		const userID = req.user.id
		const updateData = req.body

		const data = await updateUser(userID, updateData)

		return res.json({
			data,
			message: 'User has been updated!'
		})
	})
	//#endregion

	return router
}
