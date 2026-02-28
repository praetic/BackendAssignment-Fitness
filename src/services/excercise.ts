import { models } from '../db'
import type { updateExerciseBody } from '../schemas/exercise'
import { ApiError } from '../utils/ApiError'
import type { EXERCISE_DIFFICULTY } from '../utils/enums'

const { Exercise, Program } = models

export const createExercise = async (
	difficulty: EXERCISE_DIFFICULTY,
	name: string,
	programID: number
) => {
	const program = await Program.findOne({ where: { id: programID } })

	if (!program) {
		throw new ApiError(404, 'NOT_FOUND', 'Program does not exist!')
	}

	const exercise = await Exercise.create({ difficulty, name, programID })

	return {
		id: exercise.id
	}
}

export const updateExercise = async (exerciseID: number, updateData: updateExerciseBody) => {
	// if no fields provided, theres nothing to update
	if (Object.keys(updateData).length === 0) {
		throw new ApiError(400, 'EMPTY_BODY', 'No fields provided for update!')
	}

	//if program doesnt exist
	if (updateData.programID) {
		const program = await Program.findByPk(updateData.programID)

		if (!program) {
			throw new ApiError(404, 'NOT_FOUND', 'Program does not exist!')
		}
	}

	const id = await Exercise.update(updateData, { where: { id: exerciseID } })

	return {
		id: id[0].toString()
	}
}

export const deleteExercise = async (exerciseID: number) => {
	const count = await Exercise.destroy({ where: { id: exerciseID } })

	if (count === 0) {
		throw new ApiError(404, 'NOT_FOUND', 'Exercise not found!')
	}

	return {
		id: exerciseID.toString()
	}
}
