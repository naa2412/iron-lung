const router = require('express').Router();
const notifController = require('../controllers/notification.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, notifController.getNotifications);
router.get('/unread-count', authMiddleware, notifController.getUnreadCount);
router.put('/read-all', authMiddleware, notifController.markAllAsRead);
router.put('/:id/read', authMiddleware, notifController.markAsRead);

module.exports = router;
