const bcrypt = require('bcrypt');

class PasswordService {
	constructor(password) {
		this.password = password;
	}

	async genHash() {
		if (!this.password) throw Error('Отсутствует параметр password');

		const hash = await bcrypt.hash(String(this.password), 4);
		return hash;
	}

	async checkEqual(hashPassword) {
		if (!hashPassword || !this.password) throw Error('Некорректные параметры');

		const result = await bcrypt.compare(this.password, hashPassword);
		return result;
	}
}

module.exports.PasswordService = PasswordService;
