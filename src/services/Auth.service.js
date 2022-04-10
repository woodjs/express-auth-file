const ApiError = require('./ApiError.service');
const { PasswordService } = require('./Password.service');
const { TokenService } = require('./Token.service');
const { TokenJWTService } = require('./TokenJWT.service');
const { UserService } = require('./User.service');

class AuthService {
	async signup(data) {
		const { id, password } = data;

		if (!id || !password) throw ApiError.badRequest('Некорректные параметры');

		const user = await UserService.findById(id).catch(() => false);

		if (user)
			throw ApiError.forbiden(
				'Пользователь с такими данными уже зарегистрирован'
			);

		const passwordService = new PasswordService(password);
		const hashPassword = await passwordService.genHash();
		const userDB = await UserService.create({ id, password: hashPassword });
		const tokens = await TokenService.getTokens({ userId: userDB.id });

		return tokens;
	}

	async signin(data) {
		const { id, password } = data;

		if (!id || !password) throw ApiError.badRequest('Некорректные параметры');

		const user = await UserService.findById(id);

		const passwordService = new PasswordService(password);
		const statusPassword = await passwordService.checkEqual(user.password);

		if (!statusPassword) throw ApiError.forbiden('Неверный пароль');

		const tokens = await TokenService.getTokens({ userId: user.id });

		return tokens;
	}

	async refresh(data) {
		const { refreshToken } = data;
		if (!refreshToken) throw ApiError.badRequest('Некорректные параметры');

		const verify = await TokenJWTService.verifyRefresh(refreshToken);
		const tokenDB = await TokenService.findByToken(refreshToken);

		if (!verify || !tokenDB) throw ApiError.notAuthorization();

		const tokens = await TokenService.getTokens({ userId: verify.id });

		return tokens;
	}

	async logout(userId) {
		if (!userId) throw ApiError.badRequest('Некорректные параметры');

		const tokenDB = await TokenService.findByUserId(userId);

		if (tokenDB) {
			await TokenService.destroyByUserId(userId);
		}

		return { message: 'Вы успешно вышли' };
	}
}

module.exports.AuthService = new AuthService();
