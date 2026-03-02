import { Router, type Request, type Response, type NextFunction } from 'express'
import { getUsers, getUser, updateUser } from '../../services/admin/user'
import { validateBody, validateParams } from '../../middlewares/validate'
import {
	getAdminUserParamsSchema,
	patchAdminUserBodySchema,
	patchAdminUserParamsSchema
} from '../../schemas/admin/users'

const router = Router()

export default () => {
	//#region get all Users
	router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const data = await getUsers()

			return res.json({
				data,
				message: req.t('user_list')
			})
		} catch (err) {
			next(err)
		}
	})
	//#endregion

	//#region get User detail
	router.get(
		'/:userID',
		validateParams(getAdminUserParamsSchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { userID } = req.params
				const data = await getUser(Number(userID))

				return res.json({
					data,
					message: req.t('user_detail')
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	//#region update User
	router.patch(
		'/:userID',
		validateParams(patchAdminUserParamsSchema),
		validateBody(patchAdminUserBodySchema),
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const { userID } = req.params
				const updateData = req.body

				const data = await updateUser(Number(userID), updateData)

				return res.json({
					data,
					message: req.t('user_updated')
				})
			} catch (err) {
				next(err)
			}
		}
	)
	//#endregion

	return router
}
