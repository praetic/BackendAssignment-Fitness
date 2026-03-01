import bcrypt from 'bcrypt'
import { models } from '../db'
import { signAccessToken } from '../utils/jwt'
import { ApiError, ErrorCode } from '../utils/ApiError'

const { User } = models

export const registerUser = async (email: string, password: string, role: string) => {
	const existingUser = await User.findOne({ where: { email }, attributes: ['id', 'password'] })

	if (existingUser) {
		throw new ApiError(409, ErrorCode.EMAIL_ALREADY_EXISTS, 'Email is already registered!')
	}

	const passwordHash = await bcrypt.hash(password, 13)

	const createdUser = await User.create({
		email,
		password: passwordHash,
		role
	})

	return {
		user: {
			id: Number(createdUser.id)
		},
		accessToken: signAccessToken({
			id: createdUser.id.toString(),
			role: createdUser.role
		})
	}
}

export const loginUser = async (email: string, password: string) => {
	const user = await User.findOne({ where: { email }, attributes: ['id', 'password'] })

	if (!user) {
		throw new ApiError(401, ErrorCode.INVALID_CREDENTIALS, 'Invalid email or password!')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new ApiError(401, ErrorCode.INVALID_CREDENTIALS, 'Invalid email or password!')
	}

	return {
		user: {
			id: Number(user.id)
		},
		accessToken: signAccessToken({
			id: user.id.toString(),
			role: user.role
		})
	}
}
