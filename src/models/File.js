module.exports = (sequelize, DataTypes) => {
	const File = sequelize.define(
		'File',
		{
			userId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			extension: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			mime: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			size: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'files',
		}
	);

	File.associate = (models) => {
		File.belongsTo(models.User, {
			foreignKey: 'userId',
		});
	};

	return File;
};
