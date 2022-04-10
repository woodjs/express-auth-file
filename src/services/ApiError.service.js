class ApiError extends Error {
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}

	static message(code, message) {
		return new ApiError(code, message);
	}

	static test(message) {
		return new ApiError(100, message);
	}

	static badRequest(message) {
		return new ApiError(400, message);
	}

	static notFound(message) {
		return new ApiError(404, message);
	}

	static forbiden(message) {
		return new ApiError(403, message);
	}

	static internal(message) {
		return new ApiError(500, message);
	}

	static notAuthorization() {
		return new ApiError(401, 'Вы не авторизованы');
	}
}

module.exports = ApiError;
