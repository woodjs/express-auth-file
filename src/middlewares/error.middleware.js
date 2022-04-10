/* eslint-disable no-unused-vars */
const ApiError = require('../services/ApiError.service');

exports.errorHandlerMiddleware = (err, req, res, next) => {
	const data = {
		timestamp: Math.round(Date.now() / 1000),
		path: req.originalUrl,
		err: err.stack,
	};

	let error = { message: err.message || 'Неизвестная ошибка сервера' };

	if (process.env.NODE_ENV === 'development') {
		error = Object.assign(data, error);
	}

	if (err instanceof ApiError) {
		return res.status(err.status).json(error);
	}

	return res.status(500).json(error);
};
