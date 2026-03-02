import { models } from '../db'

const { Program } = models

export const getPrograms = async () => {
	const programs = await Program.findAll()

	return programs
}
