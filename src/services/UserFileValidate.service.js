const ApiError = require('./ApiError.service');

class UserFileValidateService {
	isAllow(userId, fileData) {
		if (!userId || !fileData) throw Error('Некорректные параметры');
		if (!fileData.userId) throw Error('Отсутствует параметр userId');

		if (userId === fileData.userId) return true;

		throw ApiError.forbiden('Недостаточно прав');
	}
}

module.exports.UserFileValidateService = new UserFileValidateService();
