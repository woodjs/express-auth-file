const { FileRepository } = require('../repositories/File.repository');
const ApiError = require('./ApiError.service');

class FileService {
	async findById(id) {
		if (!id) throw Error('Отсутствует параметр id');

		const file = await FileRepository.findById(id);

		if (!file) throw ApiError.notFound('Файл не найден');

		return file;
	}

	async findByParams(data) {
		const { userId, offset, limit } = data;
		if (
			!userId ||
			typeof offset === 'undefined' ||
			typeof limit === 'undefined'
		)
			throw Error('Некорректные параметры');

		const files = await FileRepository.findByParams(data);

		return files;
	}

	async destroy(id) {
		if (!id) throw Error('Отсутствует параметр id');
		const file = await FileRepository.destroy(id);

		if (!file) throw ApiError.internal('Не удалось удалить файл c бд');

		return file;
	}

	async create(data) {
		const { userId, name, extension, mime, size } = data;

		if (!userId || !name || !extension || !mime || !size)
			throw Error('Некорректные параметры');

		const file = await FileRepository.create(data);

		return file;
	}
}

module.exports.FileService = new FileService();
