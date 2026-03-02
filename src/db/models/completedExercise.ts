import { type Sequelize, DataTypes, type Model } from 'sequelize'
import type { ExerciseModel } from './exercise'
import type { UserModel } from './user'

export interface CompletedExerciseModel extends Model {
	id: number
	userID: number
	exerciseID: number
	completedAt: Date
	durationSeconds: number
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date | null

	exercise: ExerciseModel
	user: UserModel
}

export default (sequelize: Sequelize, modelName: string) => {
	const CompletedExerciseModelCtor = sequelize.define<CompletedExerciseModel>(
		modelName,
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			userID: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			exerciseID: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			completedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
			},
			durationSeconds: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: { min: 1 }
			}
		},
		{
			paranoid: true,
			timestamps: true,
			tableName: 'completed_exercises'
		}
	)

	CompletedExerciseModelCtor.associate = (models) => {
		CompletedExerciseModelCtor.belongsTo(models.Exercise, {
			foreignKey: { name: 'exerciseID', allowNull: false },
			onDelete: 'CASCADE'
		})
		CompletedExerciseModelCtor.belongsTo(models.User, {
			foreignKey: { name: 'userID', allowNull: false },
			onDelete: 'CASCADE'
		})
	}

	return CompletedExerciseModelCtor
}
