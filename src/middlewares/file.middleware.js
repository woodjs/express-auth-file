const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

exports.fileUpload = () => {
	const storage = multer.diskStorage({
		destination: (ctx, file, cb) => {
			cb(null, 'src/public');
		},
		filename: (req, file, cb) => {
			cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
		},
	});
	const upload = multer({
		storage,
	});

	return upload;
};
