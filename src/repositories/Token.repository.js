const { Token } = require('../models');

class TokenRepository {
	findByUserId(userId) {
		const token = Token.findOne({ where: { userId } });
		return token;
	}

	findByToken(refreshToken) {
		const token = Token.findOne({ where: { refreshToken } });
		return token;
	}

	create(data) {
		const { userId, refreshToken } = data;
		const token = Token.create({ userId, refreshToken });
		return token;
	}

	destroyByUserId(userId) {
		const token = Token.destroy({ where: { userId } });
		return token;
	}
}

module.exports.TokenRepository = new TokenRepository();
