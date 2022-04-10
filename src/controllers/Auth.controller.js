const { AuthService } = require('../services/Auth.service');

class AuthController {
	async signup(req, res) {
		const result = await AuthService.signup(req.body);
		return res.json(result);
	}

	async signin(req, res) {
		const result = await AuthService.signin(req.body);
		return res.json(result);
	}

	async refresh(req, res) {
		const result = await AuthService.refresh(req.body);
		return res.json(result);
	}

	async logout(req, res) {
		const userId = req.user.id;
		const result = await AuthService.logout(userId);
		return res.json(result);
	}
}

module.exports.AuthController = new AuthController();
