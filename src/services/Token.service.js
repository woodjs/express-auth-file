const { TokenJWTService } = require('./TokenJWT.service');
const { TokenRepository } = require('../repositories/Token.repository');
const ApiError = require('./ApiError.service');

class TokenService {
	constructor(token) {
		this.token = token;
	}

	async getTokens(data) {
		if (!data) throw Error('Отсутствет объект с данными');
		const { userId } = data;

		if (!userId) throw Error('Не передан userId');

		const tokens = await TokenJWTService.genTokens({ id: userId });
		await this.save({ userId, refreshToken: tokens.refreshToken });

		return tokens;
	}

	async save(data) {
		const { userId, refreshToken } = data;

		if (!userId || !refreshToken) throw Error('Некорректные параметры');

		const tokenData = await this.findByUserId(userId);

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await TokenRepository.create({ userId, refreshToken });

		return token;
	}

	async create(data) {
		const { userId, refreshToken } = data;

		if (!userId || !refreshToken) throw Error('Некорректные параметры');

		const token = await TokenRepository.create({ userId, refreshToken });

		return token;
	}

	async destroyByUserId(userId) {
		if (!userId) throw Error('Отсутствует параметр userId');

		const result = await TokenRepository.destroyByUserId(userId);

		if (!result) throw ApiError.internal('Не удалось выйти');

		return result;
	}

	async findByToken(refreshToken) {
		if (!refreshToken) throw Error('Отсутствует параметр refreshToken');

		const data = await TokenRepository.findByToken(refreshToken);

		return data;
	}

	async findByUserId(userId) {
		if (!userId) throw Error('Отсутствует параметр userId');

		const data = await TokenRepository.findByUserId(userId);

		return data;
	}
}

module.exports.TokenService = new TokenService();
