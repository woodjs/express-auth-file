const { Router } = require('express');
const { UserController } = require('../controllers/User.controller');
const { isAuth } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/info', isAuth, UserController.findById);

module.exports = router;
