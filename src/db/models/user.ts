import { type Sequelize, DataTypes, type Model } from 'sequelize'

import { ROLE } from '../../utils/enums'

export interface UserModel extends Model {
	id: number
	name: string
	nickName: string
	surname: string
	email: string
	age: number
	role: ROLE
	password: string
	createdAt: Date
	updatedAt: Date
}

export default (sequelize: Sequelize, modelName: string) => {
	const UserModelCtor = sequelize.define<UserModel>(
		modelName,
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING
			},
			nickName: {
				type: DataTypes.STRING
			},
			surname: {
				type: DataTypes.STRING
			},
			email: {
				type: DataTypes.STRING
			},
			age: {
				type: DataTypes.INTEGER
			},

			role: {
				type: DataTypes.ENUM(...Object.values(ROLE))
			},
			password: {
				type: DataTypes.STRING
			}
		},
		{
			paranoid: true,
			timestamps: true,
			tableName: 'users'
		}
	)

	UserModelCtor.associate = (_models) => {}

	return UserModelCtor
}
