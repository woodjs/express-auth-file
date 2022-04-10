const { Sequelize, DataTypes } = require('sequelize');
const config = require('./index');

const { host, user, pass, database, dialect } = config.db;

const sequelize = new Sequelize(database, user, pass, {
	host,
	dialect,
	pool: {
		min: 0,
		max: 5,
		acquire: 30000,
		idle: 10000,
	},
	logging: config.db.logging || false,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;

module.exports = db;
