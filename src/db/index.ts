import fs from 'node:fs'
import path from 'node:path'
import { Sequelize } from 'sequelize'
import config from 'config'

import defineExercise from './models/exercise'
import defineProgram from './models/program'
import defineUser from './models/user'
import type { IConfig as IConfigMap } from '../types/config'

const DATABASE_CONFIG = config.get('database') as IConfigMap['database']

const sequelize: Sequelize = new Sequelize(
	DATABASE_CONFIG.database,
	DATABASE_CONFIG.username,
	DATABASE_CONFIG.password,
	{
		...DATABASE_CONFIG.options,
		dialectOptions: {}
	}
)

sequelize.authenticate().catch((e: any) => console.error(`Unable to connect to the database${e}.`))

const Exercise = defineExercise(sequelize, 'exercise')
const Program = defineProgram(sequelize, 'program')
const User = defineUser(sequelize, 'user')

const models = {
	Exercise,
	Program,
	User
}
type Models = typeof models

// check if every model is imported
const modelsFiles = fs.readdirSync(path.join(__dirname, 'models'))
console.log(modelsFiles)

if (Object.keys(models).length !== modelsFiles.length) {
	throw new Error('You probably forgot import database model!')
}

Object.values(models).forEach((value: any) => {
	if (value.associate) {
		value.associate(models)
	}
})

export { models, sequelize }
export type { Models }
