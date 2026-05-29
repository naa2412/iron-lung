const router = require('express').Router();
const utilsController = require('../controllers/utils.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.post('/fetch-meta', authMiddleware, utilsController.fetchMetaTags);

module.exports = router;
