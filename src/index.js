const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./config/db.config');
const { errorHandlerMiddleware } = require('./middlewares/error.middleware');
require('./models');

const app = express();

sequelize
	.sync()
	.then(() => {
		console.info('Успешно подключился к Базе Данных');
	})
	.catch((err) => console.log(err.message));

app
	.use(
		cors({
			origin: '*',
			credentials: true,
		})
	)
	.use(express.json())
	.use('/api', routes)
	.use(errorHandlerMiddleware);

app.listen(8080, () => console.info('Server is start'));
