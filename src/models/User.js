module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'users',
			timestamps: false,
		}
	);

	User.associate = (models) => {
		User.hasMany(models.File, {
			onDelete: 'cascade',
			foreignKey: 'userId',
		});

		User.hasOne(models.Token, {
			onDelete: 'cascade',
			foreignKey: 'userId',
		});
	};

	return User;
};
