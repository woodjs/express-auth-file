const ApiError = require('../services/ApiError.service');
const { TokenJWTService } = require('../services/TokenJWT.service');

exports.isAuth = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) return next(ApiError.notAuthorization());

		const accessToken = authHeader.split(' ')[1];

		if (!accessToken) return next(ApiError.notAuthorization());

		const userData = await TokenJWTService.verifyAccessToken(accessToken);

		if (!userData) return next(ApiError.message(419, 'Ваша сессия истекла'));

		req.user = userData;

		return next();
	} catch (e) {
		return next(ApiError.notAuthorization());
	}
};
