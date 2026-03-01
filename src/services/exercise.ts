import { models } from '../db'

const { Exercise, Program } = models

export const getExercises = async () => {
	const exercises = await Exercise.findAll({
		include: [{ model: Program }]
	})

	return exercises
}
