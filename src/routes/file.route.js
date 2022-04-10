const { Router } = require('express');
const { FileController } = require('../controllers/File.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { fileUpload } = require('../middlewares/file.middleware');

const router = Router();

router.post(
	'/file/upload',
	isAuth,
	fileUpload().single('file'),
	FileController.upload
);
router.delete('/file/delete/:id', isAuth, FileController.destroy);
router.get('/file/list', isAuth, FileController.findByParams);
router.get('/file/:id', isAuth, FileController.findById);
router.get('/file/download/:id', isAuth, FileController.downloadById);
router.put(
	'/file/update/:id',
	isAuth,
	fileUpload().single('file'),
	FileController.updateById
);

module.exports = router;
