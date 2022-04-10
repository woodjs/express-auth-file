module.exports = (sequelize, DataTypes) => {
	const Token = sequelize.define(
		'Token',
		{
			userId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			tableName: 'user_tokens',
		}
	);

	return Token;
};
