import { type Sequelize, DataTypes, type Model } from 'sequelize'
import type { EXERCISE_DIFFICULTY } from '../../utils/enums'
import type { ExerciseModel } from './exercise'

export interface ProgramModel extends Model {
	id: number
	difficulty: EXERCISE_DIFFICULTY
	name: string
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date | null

	exercises: ExerciseModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
	const ProgramModelCtor = sequelize.define<ProgramModel>(
		modelName,
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING(200),
				allowNull: false
			}
		},
		{
			paranoid: true,
			timestamps: true,
			tableName: 'programs'
		}
	)

	ProgramModelCtor.associate = (models) => {
		ProgramModelCtor.hasMany(models.Exercise, {
			foreignKey: {
				name: 'programID',
				allowNull: false
			}
		})
	}

	return ProgramModelCtor
}
