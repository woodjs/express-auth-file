const config = require('../config');
const { FileService } = require('../services/File.service');
const { UserFileService } = require('../services/UserFile.service');
const {
	UserFileValidateService,
} = require('../services/UserFileValidate.service');

class FileController {
	async upload(req, res) {
		const userId = req.user.id;
		const result = await UserFileService.upload({ userId, file: req.file });

		return res.json(result);
	}

	async destroy(req, res) {
		const userId = req.user.id;
		const { id } = req.params;
		await UserFileService.destroy({ userId, id });

		return res.json({ message: 'Файл успешно удален' });
	}

	async findById(req, res) {
		const userId = req.user.id;
		const { id } = req.params;
		const result = await UserFileService.findById({ userId, id });

		return res.json(result);
	}

	async findByParams(req, res) {
		const userId = req.user.id;
		const result = await UserFileService.findByParams({ userId, ...req.query });

		return res.json(result);
	}

	async downloadById(req, res) {
		const userId = req.user.id;
		const { id } = req.params;
		const fileDB = await UserFileService.findById({ userId, id });
		const file = `${config.filesPath}/${fileDB.name}.${fileDB.extension}`;

		UserFileValidateService.isAllow(userId, fileDB);

		return res.download(file);
	}

	async updateById(req, res) {
		const userId = req.user.id;
		const { id } = req.params;
		const result = await UserFileService.updateById({
			file: req.file,
			userId,
			id,
		});

		return res.json(result);
	}
}

module.exports.FileController = new FileController();
