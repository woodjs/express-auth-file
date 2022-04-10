const { Router } = require('express');
const { isAuth } = require('../middlewares/auth.middleware');
const { AuthController } = require('../controllers/Auth.controller');

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.post('/signin/new_token', AuthController.refresh);
router.get('/logout', isAuth, AuthController.logout);

module.exports = router;
