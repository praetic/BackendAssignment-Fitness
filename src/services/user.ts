import { models } from '../db'
import type { updateUserBody } from '../schemas/users'
import { ApiError, ErrorCode } from '../utils/ApiError'

const { User } = models

export const getUsers = async () => {
	const users = await User.findAll({ attributes: ['id', 'nickName'] })

	return users
}

export const getUser = async (userID: number) => {
	const user = await User.findByPk(userID, {
		attributes: ['id', 'name', 'surname', 'age', 'nickName']
	})

	if (!user) {
		throw new ApiError(ErrorCode.NOT_FOUND, 'User not found!')
	}

	return user
}

export const updateUser = async (userID: number, updateData: updateUserBody) => {
	if (!updateData || Object.keys(updateData).length === 0) {
		throw new ApiError(ErrorCode.EMPTY_BODY, 'No fields provided for update!')
	}

	// user exists, we dont need to check because its been checked in jwt middleware
	await User.update(updateData, {
		where: { id: userID }
	})

	return {
		id: userID
	}
}
