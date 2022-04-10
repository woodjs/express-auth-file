const config = require('../config');
const { deleteFile } = require('../helpers/deleteFile');
const ApiError = require('./ApiError.service');
const { FileService } = require('./File.service');
const { UserFileValidateService } = require('./UserFileValidate.service');

class UserFileService {
	async findById(data) {
		const { userId, id } = data;

		if (!userId || !id) throw ApiError.badRequest('Некорректные параметры');

		const fileDB = await FileService.findById(id);
		UserFileValidateService.isAllow(userId, fileDB);

		return fileDB;
	}

	async upload(data) {
		const { userId, file } = data;

		if (!userId || !file) throw ApiError.badRequest('Вы не отправили файл');

		const { mimetype, filename, size } = file;
		const dataFile = filename.split('.');
		const name = dataFile[0];
		const extension = dataFile[1];
		const fileDB = await FileService.create({
			userId,
			name,
			extension,
			mime: mimetype,
			size,
		});

		return fileDB;
	}

	async destroy(data) {
		const { userId, id } = data;

		if (!userId || !id) throw ApiError.badRequest('Некорректные параметры');

		// Поиск файла в бд
		const fileDB = await FileService.findById(id);

		UserFileValidateService.isAllow(userId, fileDB);

		const filePath = `${config.filesPath}/${fileDB.name}.${fileDB.extension}`;

		// Удаляем с бд
		await FileService.destroy(id);
		// Удаляем с хранилища
		await deleteFile(filePath);

		return true;
	}

	async findByParams(data) {
		const { userId } = data;

		if (!userId) throw ApiError.badRequest('Некорректные параметры');

		const limit = Number(data.list_size) || 10;
		const page = Number(data.page) || 1;
		const offset = page * limit - limit;

		const files = await FileService.findByParams({ userId, offset, limit });

		return files;
	}

	async updateById(data) {
		const { file, userId, id } = data;

		if (!file || !userId || !id)
			throw ApiError.badRequest('Некорректные параметры');

		// Поиск файла в бд
		const fileDB = await FileService.findById(id);

		UserFileValidateService.isAllow(userId, fileDB);

		const filePath = `${config.filesPath}/${fileDB.name}.${fileDB.extension}`;
		const { mimetype, filename, size } = file;
		const dataFile = filename.split('.');
		const name = dataFile[0];
		const extension = dataFile[1];

		fileDB.name = name;
		fileDB.extension = extension;
		fileDB.mime = mimetype;
		fileDB.size = size;

		const updFileDB = await fileDB.save();

		await deleteFile(filePath);

		return updFileDB;
	}
}

module.exports.UserFileService = new UserFileService();
