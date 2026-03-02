import { type Sequelize, DataTypes, type Model } from 'sequelize'

import { ROLE } from '../../utils/enums'
import type { CompletedExerciseModel } from './completedExercise'

export interface UserModel extends Model {
	id: number
	name: string
	nickName: string
	surname: string
	email: string
	age: number
	role: ROLE
	passwordHash: string
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date | null

	completedExercises: CompletedExerciseModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
	const UserModelCtor = sequelize.define<UserModel>(
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
				allowNull: true
			},
			nickName: {
				type: DataTypes.STRING(200),
				allowNull: true
			},
			surname: {
				type: DataTypes.STRING(200),
				allowNull: true
			},
			email: {
				type: DataTypes.STRING(200),
				allowNull: false
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: true
			},
			role: {
				type: DataTypes.ENUM(...Object.values(ROLE)),
				allowNull: false
			},
			passwordHash: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			paranoid: true,
			timestamps: true,
			tableName: 'users'
		}
	)

	UserModelCtor.associate = (models) => {
		UserModelCtor.hasMany(models.CompletedExercise, {
			foreignKey: {
				name: 'userID',
				allowNull: false
			},
			onDelete: 'CASCADE'
		})
	}

	return UserModelCtor
}
