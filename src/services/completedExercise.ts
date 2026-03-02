import { models } from '../db'
import { ApiError, ErrorCode } from '../utils/ApiError'

const { Exercise, CompletedExercise } = models

export const createCompletedExercise = async (
	durationSeconds: number,
	exerciseID: number,
	userID: number,
	completedAt: Date
) => {
	const exercise = await Exercise.findByPk(exerciseID)

	if (!exercise) {
		throw new ApiError(ErrorCode.NOT_FOUND, 'Exercise does not exist!')
	}

	const completedExercise = await CompletedExercise.create({
		durationSeconds,
		exerciseID,
		userID,
		completedAt
	})

	return { id: completedExercise.id }
}

export const deleteCompletedExercise = async (completedExerciseID: number, userID: number) => {
	const completedExercise = await CompletedExercise.findOne({
		where: {
			id: completedExerciseID,
			userID
		}
	})

	if (!completedExercise) {
		throw new ApiError(
			ErrorCode.NOT_FOUND,
			'Completed exercise does not exist or cannot be deleted!'
		)
	}

	await completedExercise.destroy()

	return { id: Number(completedExercise.id) }
}

export const getCompletedExercises = async (userID: number) => {
	const completedExercises = await CompletedExercise.findAll({
		where: { userID },
		include: [
			{
				model: Exercise
			}
		]
	})

	return completedExercises
}
