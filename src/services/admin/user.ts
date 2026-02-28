import { models } from '../../db'
import type { patchAdminUserBody } from '../../schemas/admin/user'

const { User } = models

export const getUsers = async () => {
	const users = await User.findAll()

	return users
}

export const getUser = async (userID: number) => {
	const user = await User.findByPk(userID)

	return user
}

export const updateUser = async (usedrID: number, updateData: patchAdminUserBody) => {
	const user = await User.update(updateData, { where: { id: usedrID } })

	return user
}
