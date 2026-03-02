import { Op } from 'sequelize'
import { models } from '../db'
import type { getExercisesQuery } from '../schemas/exercises'

const { Exercise, Program } = models

export const getExercises = async (query: getExercisesQuery) => {
	const { page = 1, limit = 10, programID, search } = query

	const offset = (page - 1) * limit

	const where: any = {}

	if (programID) {
		where.programID = programID
	}

	if (search) {
		where.name = {
			[Op.iLike]: `%${String(search).trim()}%` // case-insensitive
		}
	}

	const { rows, count } = await Exercise.findAndCountAll({
		where,
		include: [Program],
		limit,
		offset,
		order: [['name', 'ASC']]
	})

	return {
		exercises: rows,
		total: count,
		page,
		limit,
		totalPages: Math.ceil(count / limit)
	}
}
