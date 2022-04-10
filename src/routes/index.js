const { Router } = require('express');

const router = Router();

router.use(require('./auth.route'));
router.use(require('./file.route'));
router.use(require('./user.route'));

router.all('*', (req, res) =>
	res.status(404).json({ message: 'Неизвестный маршрут' })
);

module.exports = router;
