import { models, sequelize } from '../../db'
import { ApiError, ErrorCode } from '../../utils/ApiError'

const { Exercise, Program, CompletedExercise } = models

export const updateAdminProgramExercises = async (programID: number, exerciseIDs: number[]) => {
	const t = await sequelize.transaction()

	try {
		const program = await Program.findByPk(programID, {
			include: [
				{
					model: Exercise,
					as: 'exercises'
				}
			]
		})

		if (!program) {
			throw new ApiError(404, ErrorCode.NOT_FOUND, 'Program does not exist!')
		}

		// ids in db
		const currentIDs = program.exercises.map((e) => {
			return e.id
		})

		// ids to add
		const toAdd = exerciseIDs.filter((exerciseID) => {
			return !currentIDs.includes(exerciseID)
		})

		// ids to remove
		const toRemove = currentIDs.filter((exerciseID) => {
			return !exerciseIDs.includes(exerciseID)
		})

		if (toAdd.length) {
			await Exercise.update({ programID }, { where: { id: toAdd }, transaction: t })
		}

		if (toRemove.length) {
			await CompletedExercise.destroy({ where: { exerciseID: toRemove }, transaction: t })
			await Exercise.destroy({ where: { id: toRemove }, transaction: t })
		}

		await t.commit()

		return {
			id: program.id
		}
	} catch (err) {
		await t.rollback()

		throw err
	}
}
