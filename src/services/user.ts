import { models } from '../db'
import { ApiError } from '../utils/ApiError'

const { User } = models

export const getUser = async (userID: number) => {
	const user = await User.findByPk(userID)

	if (!user) {
		throw new ApiError(404, 'NOT_FOUND', 'User not found!')
	}

	return user
}
