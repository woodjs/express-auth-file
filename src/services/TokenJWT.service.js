const jwt = require('jsonwebtoken');
const config = require('../config');

class TokenJWTService {
	genTokens(payload) {
		if (!payload) throw Error('Некорректные параметры');

		const accessToken = this.genAccessToken(payload);
		const refreshToken = this.genRefreshToken(payload);

		return { accessToken, refreshToken };
	}

	genAccessToken(payload) {
		if (!payload) throw Error('Некорректные параметры');
		return jwt.sign(payload, config.jwt.access.secret, {
			expiresIn: config.jwt.access.expiresIn,
		});
	}

	genRefreshToken(payload) {
		if (!payload) throw Error('Некорректные параметры');
		return jwt.sign(payload, config.jwt.refresh.secret, {
			expiresIn: config.jwt.refresh.expiresIn,
		});
	}

	verifyAccessToken(token) {
		if (!token) throw Error('Некорректные параметры');
		try {
			const userData = jwt.verify(token, config.jwt.access.secret);
			return userData;
		} catch (e) {
			return null;
		}
	}

	verifyRefresh(token) {
		if (!token) throw Error('Некорректные параметры');
		try {
			const userData = jwt.verify(token, config.jwt.refresh.secret);
			return userData;
		} catch (e) {
			return null;
		}
	}
}

module.exports.TokenJWTService = new TokenJWTService();
