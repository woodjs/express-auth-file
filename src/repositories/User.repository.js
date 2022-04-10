const { User } = require('../models');

class UserRepository {
	findById (id) {
		const user = User.findByPk(id);
		return user;
	};
	
	create (id, password)  {
		const user = User.create({ id, password });
		return user;
	};
}


module.exports.UserRepository = new UserRepository();