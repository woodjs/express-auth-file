require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		db: {
			host: 'localhost',
			user: 'root',
			pass: 'root',
			database: 'project',
			dialect: 'mysql',
			logging: true,
		},
		jwt: {
			access: {
				type: 'access',
				secret: 'asdsadsadsad',
				expiresIn: '10m',
			},
			refresh: {
				type: 'refresh',
				secret: 'dfddsdffsf',
				expiresIn: '30d',
			},
		},
		filesPath: process.env.FILES_PATH,
	},
	production: {
		db: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			pass: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			dialect: process.env.DB_DIALECT,
		},
		jwt: {
			access: {
				type: 'access',
				secret: process.env.ACCESS_SECRET,
				expiresIn: process.env.ACCESS_EXPIRES,
			},
			refresh: {
				type: 'refresh',
				secret: process.env.REFRESH_SECRET,
				expiresIn: process.env.REFRESH_EXPIRES,
			},
		},
		filesPath: process.env.FILES_PATH,
	},
};

module.exports = config[env];
