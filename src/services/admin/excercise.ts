import { models, sequelize } from '../../db'
import type { updateExerciseBody } from '../../schemas/admin/exercises'
import { ApiError, ErrorCode } from '../../utils/ApiError'
import type { EXERCISE_DIFFICULTY } from '../../utils/enums'

const { Exercise, Program, CompletedExercise } = models

export const createExercise = async (
	difficulty: EXERCISE_DIFFICULTY,
	name: string,
	programID: number
) => {
	const program = await Program.findOne({ where: { id: programID } })

	if (!program) {
		throw new ApiError(ErrorCode.NOT_FOUND, 'program_not_found')
	}

	const exercise = await Exercise.create({ difficulty, name, programID })

	return {
		id: Number(exercise.id)
	}
}

export const updateExercise = async (exerciseID: number, updateData: updateExerciseBody) => {
	// if no fields provided, theres nothing to update
	if (!updateData || Object.keys(updateData).length === 0) {
		throw new ApiError(ErrorCode.EMPTY_BODY, 'no_fields_for_update')
	}

	const exercise = await Exercise.findByPk(exerciseID)

	if (!exercise) {
		throw new ApiError(ErrorCode.NOT_FOUND, 'exercise_not_found')
	}

	//if program doesnt exist
	if (updateData.programID) {
		const program = await Program.findByPk(updateData.programID)

		if (!program) {
			throw new ApiError(ErrorCode.NOT_FOUND, 'program_not_found')
		}
	}

	await Exercise.update(updateData, { where: { id: exerciseID } })

	return {
		id: exercise.id
	}
}

export const deleteExercise = async (exerciseID: number) => {
	const t = await sequelize.transaction()

	try {
		const exercise = await Exercise.findByPk(exerciseID)

		if (!exercise) {
			throw new ApiError(ErrorCode.NOT_FOUND, 'exercise_not_found')
		}

		await CompletedExercise.destroy({ where: { exerciseID } })

		await Exercise.destroy({ where: { id: exerciseID } })

		await t.commit()

		return {
			id: exerciseID
		}
	} catch (err) {
		await t.rollback()

		throw err
	}
}
