const { File } = require('../models');

class FileRepository {
	create(data) {
		const file = File.create(data);
		return file;
	}

	findById(id) {
		const file = File.findByPk(id);
		return file;
	}

	destroy(id) {
		const file = File.destroy({ where: { id } });
		return file;
	}

	findByParams(data) {
		const { userId, offset, limit } = data;
		const files = File.findAll({ where: { userId }, offset, limit });
		return files;
	}
}

module.exports.FileRepository = new FileRepository();
