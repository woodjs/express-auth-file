const { UserRepository } = require('../repositories/User.repository');
const ApiError = require('./ApiError.service');

class UserService {
	async findById(id) {
		if (!id) throw Error('Отсутствует параметр id');

		const user = await UserRepository.findById(id);

		if (!user) throw ApiError.notFound('Пользователь не найден');

		return user;
	}

	async create(data) {
		const { id, password } = data;

		if (!id || !password) throw Error('Отсутствует параметр id или password');

		const user = await UserRepository.create(id, password);

		return user;
	}
}

module.exports.UserService = new UserService();
