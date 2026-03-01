import { type Sequelize, DataTypes, type Model } from 'sequelize'
import type { ProgramModel } from './program'

import { EXERCISE_DIFFICULTY } from '../../utils/enums'

export interface ExerciseModel extends Model {
	id: number
	difficulty: EXERCISE_DIFFICULTY
	name: string
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date | null

	program: ProgramModel
}

export default (sequelize: Sequelize, modelName: string) => {
	const ExerciseModelCtor = sequelize.define<ExerciseModel>(
		modelName,
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			difficulty: {
				type: DataTypes.ENUM(...Object.values(EXERCISE_DIFFICULTY)),
				allowNull: false
			},
			name: {
				type: DataTypes.STRING(200),
				allowNull: false
			}
		},
		{
			paranoid: true,
			timestamps: true,
			tableName: 'exercises'
		}
	)

	ExerciseModelCtor.associate = (models) => {
		ExerciseModelCtor.belongsTo(models.Program, {
			foreignKey: {
				name: 'programID',
				allowNull: false
			}
		})
		ExerciseModelCtor.hasMany(models.CompletedExercise, {
			foreignKey: {
				name: 'exerciseID',
				allowNull: false
			}
		})
	}

	return ExerciseModelCtor
}
