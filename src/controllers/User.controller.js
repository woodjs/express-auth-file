const UserDTO = require('../dtos/user.dto');
const { UserService } = require('../services/User.service');

class UserController {
	async findById(req, res) {
		const userId = req.user.id;
		const result = new UserDTO(await UserService.findById(userId));
		return res.json(result);
	}
}

module.exports.UserController = new UserController();
