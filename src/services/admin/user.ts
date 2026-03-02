import { models } from '../../db'
import type { patchAdminUserBody } from '../../schemas/admin/users'
import { ApiError, ErrorCode } from '../../utils/ApiError'

const { User } = models

export const getUsers = async () => {
	const users = await User.findAll({ attributes: { exclude: ['passwordHash'] } })

	return users
}

export const getUser = async (userID: number) => {
	const user = await User.findByPk(userID, { attributes: { exclude: ['passwordHash'] } })

	if (!user) {
		throw new ApiError(ErrorCode.NOT_FOUND, 'User does not exist!')
	}

	return user
}

export const updateUser = async (userID: number, updateData: patchAdminUserBody) => {
	// if no fields provided, theres nothing to update
	if (!updateData || Object.keys(updateData).length === 0) {
		throw new ApiError(ErrorCode.EMPTY_BODY, 'No fields provided for update!')
	}

	const user = await User.findByPk(userID)

	if (!user) {
		throw new ApiError(ErrorCode.NOT_FOUND, 'User does not exist!')
	}

	await User.update(updateData, { where: { id: userID } })

	return { id: user.id }
}
