const { unlink, access } = require('fs').promises;

exports.deleteFile = async (path) => {
	if (!path) throw Error('Некорректны путь к файлу');

	const fileLocal = await access(path)
		.then(() => true)
		.catch(() => false);

	if (fileLocal) {
		await unlink(path);
	}
};
